"""
Server-side video export endpoint for ClipCut editor.
Accepts a video file + FFmpeg arguments, processes with native FFmpeg, returns result.
Dramatically faster than FFmpeg WASM (~5-10x speedup).

Mount this router in your existing FastAPI app:
    from export_router import router as export_router
    app.include_router(export_router)
"""

import asyncio
import os
import shutil
import tempfile
import uuid
from pathlib import Path

from fastapi import APIRouter, File, Form, HTTPException, UploadFile
from fastapi.responses import FileResponse

router = APIRouter(prefix="/api", tags=["export"])

# Max file size: 500MB
MAX_FILE_SIZE = 500 * 1024 * 1024
# Cleanup exports older than 30 minutes
EXPORT_TTL_SECONDS = 1800
EXPORT_DIR = Path(tempfile.gettempdir()) / "clipcut_exports"
EXPORT_DIR.mkdir(exist_ok=True)

# Allowed resolutions — only these values are passed to FFmpeg
RESOLUTIONS = {
    "480p": "854:480",
    "720p": "1280:720",
    "1080p": "1920:1080",
}


@router.post("/editor/export")
async def export_video(
    video: UploadFile = File(...),
    resolution: str = Form("1080p"),
    audio: UploadFile | None = File(None),
    audio_volume: float = Form(0.3),
    text: str = Form(""),
    text_position: str = Form("bottom-center"),
    text_size: int = Form(48),
    text_color: str = Form("white"),
    text_bg_color: str = Form(""),
):
    """
    Export a video with optional background music and text overlay.
    Uses native FFmpeg for fast processing.

    - video: The merged/processed video file
    - resolution: Target resolution (480p, 720p, 1080p)
    - audio: Optional background music file
    - audio_volume: Background music volume (0.0 - 1.0)
    - text: Optional text overlay content
    - text_position: Position preset (e.g. bottom-center)
    - text_size: Font size in pixels
    - text_color: Font color
    - text_bg_color: Background box color (empty = no background)
    """
    if resolution not in RESOLUTIONS:
        raise HTTPException(400, f"Invalid resolution. Choose from: {list(RESOLUTIONS.keys())}")

    # Validate text_position against allowlist
    if text_position not in TEXT_POSITIONS:
        text_position = "bottom-center"

    # Clamp numeric inputs
    text_size = max(8, min(200, text_size))
    audio_volume = max(0.0, min(1.0, audio_volume))

    # Validate file size
    video.file.seek(0, 2)
    size = video.file.tell()
    video.file.seek(0)
    if size > MAX_FILE_SIZE:
        raise HTTPException(413, f"Video file too large (max {MAX_FILE_SIZE // 1024 // 1024}MB)")

    job_id = str(uuid.uuid4())[:8]
    job_dir = EXPORT_DIR / job_id
    job_dir.mkdir(parents=True, exist_ok=True)

    input_path = job_dir / "input.mp4"
    output_path = job_dir / "output.mp4"

    try:
        # Save uploaded video
        with open(input_path, "wb") as f:
            shutil.copyfileobj(video.file, f)

        # Save audio if provided
        audio_path = None
        if audio:
            audio_path = job_dir / "audio.mp3"
            with open(audio_path, "wb") as f:
                shutil.copyfileobj(audio.file, f)

        # Build FFmpeg pipeline — each step uses asyncio.create_subprocess_exec
        # (NOT subprocess shell) to avoid command injection.
        current_input = input_path
        step = 0

        # Step 1: Mix background audio
        if audio_path:
            step += 1
            mixed_path = job_dir / f"step{step}_mixed.mp4"
            filter_complex = (
                f"[1:a]volume={audio_volume}[a1];"
                f"[0:a][a1]amix=inputs=2:duration=first:dropout_transition=2[aout]"
            )
            cmd = [
                "ffmpeg", "-y",
                "-i", str(current_input),
                "-i", str(audio_path),
                "-filter_complex", filter_complex,
                "-map", "0:v", "-map", "[aout]",
                "-c:v", "copy", "-c:a", "aac", "-b:a", "192k",
                str(mixed_path),
            ]
            await _run_ffmpeg(cmd)
            current_input = mixed_path

        # Step 2: Add text overlay
        if text.strip():
            step += 1
            text_path = job_dir / f"step{step}_text.mp4"
            drawtext = _build_drawtext(text, text_position, text_size, text_color, text_bg_color)
            cmd = [
                "ffmpeg", "-y",
                "-i", str(current_input),
                "-vf", drawtext,
                "-c:v", "libx264", "-preset", "fast", "-crf", "23",
                "-c:a", "copy",
                str(text_path),
            ]
            await _run_ffmpeg(cmd)
            current_input = text_path

        # Step 3: Scale to target resolution and finalize
        scale = RESOLUTIONS[resolution]
        scale_filter = (
            f"scale={scale}:force_original_aspect_ratio=decrease,"
            f"pad={scale}:(ow-iw)/2:(oh-ih)/2"
        )
        cmd = [
            "ffmpeg", "-y",
            "-i", str(current_input),
            "-vf", scale_filter,
            "-c:v", "libx264", "-preset", "veryfast", "-crf", "23",
            "-tune", "fastdecode",
            "-movflags", "+faststart",
            "-c:a", "aac", "-b:a", "192k",
            str(output_path),
        ]
        await _run_ffmpeg(cmd)

        if not output_path.exists() or output_path.stat().st_size == 0:
            raise HTTPException(500, "Export produced empty file")

        return FileResponse(
            path=str(output_path),
            media_type="video/mp4",
            filename=f"clipcut_export_{resolution}.mp4",
            headers={"X-Job-Id": job_id},
        )

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(500, f"Export failed: {str(e)}")


@router.get("/editor/health")
async def health_check():
    """Check if the export server is reachable and FFmpeg is available."""
    try:
        proc = await asyncio.create_subprocess_exec(
            "ffmpeg", "-version",
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE,
        )
        stdout, _ = await proc.communicate()
        version = stdout.decode().split("\n")[0] if stdout else "unknown"
        return {"status": "ok", "ffmpeg": version}
    except FileNotFoundError:
        raise HTTPException(503, "FFmpeg not installed on server")


# --- Helpers ---

TEXT_POSITIONS = {
    "top-left": ("10", "10"),
    "top-center": ("(w-text_w)/2", "10"),
    "top-right": ("w-text_w-10", "10"),
    "center-left": ("10", "(h-text_h)/2"),
    "center": ("(w-text_w)/2", "(h-text_h)/2"),
    "center-right": ("w-text_w-10", "(h-text_h)/2"),
    "bottom-left": ("10", "h-text_h-10"),
    "bottom-center": ("(w-text_w)/2", "h-text_h-10"),
    "bottom-right": ("w-text_w-10", "h-text_h-10"),
}

# Allowlists for sanitizing FFmpeg filter inputs
_SAFE_COLOR_CHARS = set("abcdefghijklmnopqrstuvwxyz0123456789#@")


def _sanitize_color(color: str) -> str:
    """Only allow safe color values (hex codes or named colors)."""
    color = color.strip().lower()
    if all(c in _SAFE_COLOR_CHARS for c in color):
        return color
    return "white"


def _build_drawtext(text: str, position: str, size: int, color: str, bg_color: str) -> str:
    # Escape text for FFmpeg drawtext filter
    escaped = text.replace("\\", "\\\\").replace("'", "'\\''").replace(":", "\\:")
    x, y = TEXT_POSITIONS.get(position, TEXT_POSITIONS["bottom-center"])
    safe_color = _sanitize_color(color)
    filt = f"drawtext=text='{escaped}':fontsize={size}:fontcolor={safe_color}:x={x}:y={y}"
    if bg_color:
        safe_bg = _sanitize_color(bg_color)
        filt += f":box=1:boxcolor={safe_bg}:boxborderw=5"
    return filt


async def _run_ffmpeg(cmd: list[str], timeout: int = 300) -> None:
    """Run FFmpeg as a subprocess using create_subprocess_exec (no shell)."""
    proc = await asyncio.create_subprocess_exec(
        *cmd,
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE,
    )
    try:
        _, stderr = await asyncio.wait_for(proc.communicate(), timeout=timeout)
    except asyncio.TimeoutError:
        proc.kill()
        raise HTTPException(504, "FFmpeg timed out")
    if proc.returncode != 0:
        err = stderr.decode()[-500:] if stderr else "unknown error"
        raise HTTPException(500, f"FFmpeg error: {err}")
