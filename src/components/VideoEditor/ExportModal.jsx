/**
 * Export Modal Component
 * Provides export settings UI with resolution, format, and quality options
 * @module components/VideoEditor/ExportModal
 */

import { useState, useCallback, memo } from "react";
import Icon from "./Icon";

/* ========== STYLES ========== */
const MODAL_STYLES = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0, 0, 0, 0.8)",
    backdropFilter: "blur(8px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2000,
  },
  modal: {
    background: "linear-gradient(135deg, #1a2332 0%, #0e1820 100%)",
    borderRadius: "16px",
    width: "440px",
    maxWidth: "95vw",
    border: "1px solid rgba(117, 170, 219, 0.15)",
    boxShadow: "0 24px 64px rgba(0, 0, 0, 0.6)",
    overflow: "hidden",
  },
  header: {
    padding: "20px 24px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: "18px",
    fontWeight: 700,
    color: "white",
    margin: 0,
  },
  closeBtn: {
    background: "transparent",
    border: "none",
    color: "rgba(255, 255, 255, 0.5)",
    cursor: "pointer",
    padding: "4px",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.15s ease",
  },
  body: {
    padding: "24px",
  },
  section: {
    marginBottom: "24px",
  },
  sectionTitle: {
    fontSize: "12px",
    fontWeight: 600,
    color: "rgba(255, 255, 255, 0.5)",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    marginBottom: "12px",
  },
  optionsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "10px",
  },
  optionBtn: (isSelected) => ({
    background: isSelected 
      ? "rgba(117, 170, 219, 0.2)" 
      : "rgba(255, 255, 255, 0.04)",
    border: isSelected 
      ? "1px solid #75aadb" 
      : "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "10px",
    padding: "14px 12px",
    cursor: "pointer",
    textAlign: "center",
    transition: "all 0.15s ease",
    color: isSelected ? "white" : "rgba(255, 255, 255, 0.7)",
  }),
  optionLabel: {
    fontSize: "14px",
    fontWeight: 600,
    display: "block",
    marginBottom: "4px",
  },
  optionDesc: {
    fontSize: "11px",
    color: "rgba(255, 255, 255, 0.4)",
  },
  qualitySlider: {
    width: "100%",
    marginTop: "8px",
    accentColor: "#75aadb",
  },
  qualityLabels: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "11px",
    color: "rgba(255, 255, 255, 0.4)",
    marginTop: "6px",
  },
  infoRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 14px",
    background: "rgba(117, 170, 219, 0.08)",
    borderRadius: "10px",
    marginBottom: "20px",
  },
  footer: {
    padding: "16px 24px",
    borderTop: "1px solid rgba(255, 255, 255, 0.06)",
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
  },
  cancelBtn: {
    background: "rgba(255, 255, 255, 0.06)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    color: "rgba(255, 255, 255, 0.7)",
    padding: "10px 20px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.15s ease",
  },
  exportBtn: (disabled) => ({
    background: disabled 
      ? "rgba(117, 170, 219, 0.3)" 
      : "linear-gradient(135deg, #75aadb, #5a8cbf)",
    border: "none",
    color: disabled ? "rgba(255, 255, 255, 0.5)" : "white",
    padding: "10px 24px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: 600,
    cursor: disabled ? "not-allowed" : "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "all 0.15s ease",
  }),
};

/* ========== EXPORT OPTIONS ========== */
const RESOLUTIONS = [
  { value: "480p", label: "480p", desc: "854 × 480" },
  { value: "720p", label: "720p", desc: "1280 × 720" },
  { value: "1080p", label: "1080p", desc: "1920 × 1080" },
];

const FORMATS = [
  { value: "mp4", label: "MP4", desc: "H.264 codec" },
  { value: "webm", label: "WebM", desc: "VP9 codec" },
];

const QUALITY_PRESETS = {
  low: { crf: 28, label: "Low", size: "Smaller file" },
  medium: { crf: 23, label: "Medium", size: "Balanced" },
  high: { crf: 18, label: "High", size: "Best quality" },
};

/**
 * Export Modal Component
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether modal is open
 * @param {Function} props.onClose - Close handler
 * @param {Function} props.onExport - Export handler (receives settings)
 * @param {boolean} props.isExporting - Whether export is in progress
 * @param {number} props.progress - Export progress (0-100)
 * @param {number} props.clipCount - Number of clips to export
 * @param {number} props.duration - Total duration in seconds
 */
const ExportModal = memo(({ 
  isOpen, 
  onClose, 
  onExport, 
  isExporting = false, 
  progress = 0,
  clipCount = 0,
  duration = 0,
}) => {
  const [resolution, setResolution] = useState("1080p");
  const [format, setFormat] = useState("mp4");
  const [quality, setQuality] = useState("medium");

  const handleExport = useCallback(() => {
    onExport({
      resolution,
      format,
      quality,
      crf: QUALITY_PRESETS[quality].crf,
    });
  }, [resolution, format, quality, onExport]);

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const estimateFileSize = () => {
    // Rough estimate based on resolution and quality
    const baseRate = {
      "480p": 1.5,
      "720p": 3,
      "1080p": 6,
    }[resolution] || 3;

    const qualityMultiplier = {
      low: 0.6,
      medium: 1,
      high: 1.5,
    }[quality] || 1;

    const sizeMB = (duration * baseRate * qualityMultiplier).toFixed(1);
    return sizeMB < 1000 ? `~${sizeMB} MB` : `~${(sizeMB / 1000).toFixed(1)} GB`;
  };

  if (!isOpen) return null;

  return (
    <div 
      style={MODAL_STYLES.overlay} 
      onClick={(e) => e.target === e.currentTarget && !isExporting && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="export-modal-title"
    >
      <div style={MODAL_STYLES.modal}>
        {/* Header */}
        <div style={MODAL_STYLES.header}>
          <h2 id="export-modal-title" style={MODAL_STYLES.title}>
            Export Video
          </h2>
          {!isExporting && (
            <button
              style={MODAL_STYLES.closeBtn}
              onClick={onClose}
              aria-label="Close"
            >
              <Icon i="close" s={20} />
            </button>
          )}
        </div>

        {/* Body */}
        <div style={MODAL_STYLES.body}>
          {/* Info Row */}
          <div style={MODAL_STYLES.infoRow}>
            <Icon i="movie" s={18} c="#75aadb" />
            <span style={{ fontSize: "13px", color: "rgba(255, 255, 255, 0.7)" }}>
              {clipCount} clip{clipCount !== 1 ? "s" : ""} • {formatDuration(duration)} • {estimateFileSize()}
            </span>
          </div>

          {/* Resolution */}
          <div style={MODAL_STYLES.section}>
            <div style={MODAL_STYLES.sectionTitle}>Resolution</div>
            <div style={MODAL_STYLES.optionsGrid}>
              {RESOLUTIONS.map((res) => (
                <button
                  key={res.value}
                  style={MODAL_STYLES.optionBtn(resolution === res.value)}
                  onClick={() => setResolution(res.value)}
                  disabled={isExporting}
                >
                  <span style={MODAL_STYLES.optionLabel}>{res.label}</span>
                  <span style={MODAL_STYLES.optionDesc}>{res.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Format */}
          <div style={MODAL_STYLES.section}>
            <div style={MODAL_STYLES.sectionTitle}>Format</div>
            <div style={{ ...MODAL_STYLES.optionsGrid, gridTemplateColumns: "repeat(2, 1fr)" }}>
              {FORMATS.map((fmt) => (
                <button
                  key={fmt.value}
                  style={MODAL_STYLES.optionBtn(format === fmt.value)}
                  onClick={() => setFormat(fmt.value)}
                  disabled={isExporting}
                >
                  <span style={MODAL_STYLES.optionLabel}>{fmt.label}</span>
                  <span style={MODAL_STYLES.optionDesc}>{fmt.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quality */}
          <div style={MODAL_STYLES.section}>
            <div style={MODAL_STYLES.sectionTitle}>Quality</div>
            <div style={MODAL_STYLES.optionsGrid}>
              {Object.entries(QUALITY_PRESETS).map(([key, preset]) => (
                <button
                  key={key}
                  style={MODAL_STYLES.optionBtn(quality === key)}
                  onClick={() => setQuality(key)}
                  disabled={isExporting}
                >
                  <span style={MODAL_STYLES.optionLabel}>{preset.label}</span>
                  <span style={MODAL_STYLES.optionDesc}>{preset.size}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Progress */}
          {isExporting && (
            <div style={{ marginTop: "16px" }}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
                fontSize: "13px",
              }}>
                <span style={{ color: "rgba(255, 255, 255, 0.7)" }}>
                  Exporting...
                </span>
                <span style={{ color: "#75aadb", fontWeight: 600 }}>
                  {progress}%
                </span>
              </div>
              <div style={{
                width: "100%",
                height: "6px",
                background: "rgba(255, 255, 255, 0.06)",
                borderRadius: "3px",
                overflow: "hidden",
              }}>
                <div style={{
                  height: "100%",
                  width: `${progress}%`,
                  background: progress >= 100 
                    ? "linear-gradient(90deg, #22c55e, #16a34a)" 
                    : "linear-gradient(90deg, #75aadb, #5a8cbf)",
                  borderRadius: "3px",
                  transition: "width 0.3s ease",
                }} />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={MODAL_STYLES.footer}>
          <button
            style={MODAL_STYLES.cancelBtn}
            onClick={onClose}
            disabled={isExporting}
          >
            Cancel
          </button>
          <button
            style={MODAL_STYLES.exportBtn(isExporting || clipCount === 0)}
            onClick={handleExport}
            disabled={isExporting || clipCount === 0}
          >
            {isExporting ? (
              <>
                <div style={{
                  width: "16px",
                  height: "16px",
                  border: "2px solid rgba(255, 255, 255, 0.3)",
                  borderTopColor: "white",
                  borderRadius: "50%",
                  animation: "spin 0.8s linear infinite",
                }} />
                Exporting...
              </>
            ) : (
              <>
                <Icon i="download" s={18} />
                Export
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
});

ExportModal.displayName = "ExportModal";

export default ExportModal;
