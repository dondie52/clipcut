# NO_SLOP.md — Anti-Slop Rules for ClipCut

**Read this before writing or generating any code in this repo.**

ClipCut is a real product used by real creators in Botswana and beyond. It's not a weekend demo. Users will lose their work if save logic breaks. Captions will be wrong if transcription is sloppy. Videos won't export if the pipeline isn't tested. "It runs on my machine" is not the bar. "It works for a creator on a 4GB Android in Gaborone with patchy internet" is the bar.

Every rule below exists because AI assistants (including you, Claude) reliably fail this way. When a rule and your instinct conflict, the rule wins.

---

## 1. Visual / UI rules

**Do not produce the generic AI-SaaS look.** Specifically, do not generate:

- Purple-to-blue gradient hero with "Revolutionize Your Video Editing" headlines
- Three feature cards in a row with Lucide icons and one-line descriptions
- Pricing tables with a highlighted middle tier and "Most Popular" badges
- Dashboards stuffed with 8+ stat cards when 2 numbers would do
- Generic chatbot UIs with the same bubble-and-avatar layout as every other AI clone
- Glassmorphism applied to every surface
- Floating help (?) buttons that cover real UI elements
- "Powered by AI" badges plastered everywhere

**ClipCut's chosen style:** dark professional theme matching CapCut/DaVinci Resolve aesthetic. Layered dark grays for depth (#0f1419 base, #1a2332 panels, #243044 elevated). Blue accent (#3b82f6) for primary actions only. Functional, dense, editor-grade UI — not a marketing site disguised as an editor.

**Contrast and accessibility are not optional.** Every text-on-dark combination must hit WCAG AA (4.5:1). Captions on video must remain readable on any background — that's the whole point of subtitles.

**Information density discipline.** A video editor screen has limited real estate. Every pixel on the timeline, preview, and inspector earns its place. If you can't explain why an element is on a screen in one sentence, remove it.

**Mobile is not a downscaled desktop.** Mobile editing is a different interaction pattern (touch, bottom sheets, single-view). Don't squeeze the desktop layout into 375px and call it responsive.

---

## 2. Code rules

- **No unused imports, no unused variables, no commented-out code blocks.** If you add it, finish it; if you don't need it, delete it.
- **No inline styles as a layout fix.** If the panel is overlapping the preview, fix the flexbox — don't `style={{marginLeft: 320}}` to paper over it.
- **One responsibility per file.** No 1500-line `VideoEditor.jsx`. Split by concern: layout, timeline, preview, inspector, panels, hooks, services.
- **No hallucinated packages.** Before adding a dependency, verify it exists on npm, is actively maintained (commit within the last 12 months), and has more than 1k weekly downloads. This is how supply-chain attacks work — do not be the entry point.
- **No libraries we don't need.** We already have React, Vite, Supabase. Don't reach for Redux, MobX, Zustand, TanStack Query, Framer Motion, or a UI kit unless the project genuinely needs it. Plain React state and CSS modules are usually enough.
- **Prefer browser-native APIs over WASM/external libraries.** Web Audio API over FFmpeg WASM for audio extraction. MediaRecorder over FFmpeg for export. Canvas + drawImage over server-side rendering. The browser does more than you think.
- **No `any` in TypeScript.** No `eslint-disable` comments. No `@ts-ignore`. If you can't type it properly, you don't understand it well enough yet.
- **Error handling is part of "done".** Every fetch has a catch. Every async function has a failure path. Every panel has a loading state, an error state, and an empty state. A feature without these is not complete — it's a demo.

---

## 3. Critical-path rules (these are absolute)

These rules exist because we've already broken them and lost work, time, or user trust.

- **Never store blob URLs in persisted project data.** Blob URLs expire when the tab closes. Media files go to IndexedDB or Supabase Storage. Project data references storage paths, never `blob:http://...`.
- **Never unmount the `<video>` element conditionally.** It destroys playback state and breaks the entire editor. Hide it with CSS if needed, but never `{condition && <video />}`.
- **Never send draft IDs (`draft-xxx`) as Supabase project IDs.** Validate UUIDs before sending. Let Supabase auto-generate IDs on first INSERT.
- **Never trust the AI's JSON output without validation.** When the LLM returns edit actions, validate every action type and every parameter against an allowlist. Reject unknown types. Sanitize all params.
- **Never bundle multiple unrelated fixes in one commit.** If you're "fixing the inspector AND adding captions AND polishing the dashboard", that's three commits. Bundling is how regressions sneak in.
- **Always test on mobile before pushing.** Chrome DevTools mobile view minimum. Real device preferred. ClipCut is a PWA — mobile is a first-class platform, not an afterthought.
- **Never delete or update audit/history records.** The `governance_decisions` table and any project version history is append-only. No UPDATE, no DELETE, no exceptions.

---

## 4. Performance rules (8GB RAM is the floor)

The author's own laptop has 8GB RAM. Many target users have less. Chrome crashes ("Aw, Snap! Error code 9") are unacceptable.

- **Don't load entire video files into memory on restore.** Lazy-load from IndexedDB only when the user presses play.
- **Don't render 170 caption clips in the React DOM at once.** Virtualize the timeline — only mount clips visible in the current viewport.
- **Revoke blob URLs when no longer needed** (`URL.revokeObjectURL`). Memory leaks compound across project switches.
- **Cap caption clip count.** Group words into 5-8 second phrases, not per-word clips. 40 clips beats 170 every time, both for memory and readability.
- **Downscale thumbnails.** Media panel thumbnails are 160x90px max. Never full-resolution video frames.
- **Run `performance.memory` checks** before loading large assets and warn the user if memory is low.

---

## 5. Data rules

- **No hardcoded fake data in production code paths.** Demo data is for `/demo` routes only, never in default component state.
- **Real empty states.** "No media yet — drag and drop or click Import" with an actual import button. Not a placeholder graphic that does nothing when clicked.
- **No `// TODO: wire this up` shipped to main.** Either wire it up or don't build the UI for it yet. Empty buttons are worse than missing buttons — they break user trust.
- **Validate every project payload before saving to Supabase.** Schema mismatches cause silent 400 errors that look like "save works" but lose data.

---

## 6. AI / ML rules

- **The AI suggests, the user approves.** AI-generated edits (captions, silence removal, smart crop) must show a diff/preview before applying, with an Undo button after. Never silently mutate the timeline based on an AI response.
- **Never trust LLM JSON without schema validation.** The model may return `[]`, malformed JSON, or unexpected action types. Validate against a strict schema. Reject unknown types. Show the user what was rejected and why.
- **AI features degrade gracefully.** If the Cloudflare Worker is down, the Whisper server is offline, or the user is offline — the editor must still work for manual editing. AI is augmentation, not a hard dependency.
- **Cite the source of AI-generated content.** When auto-captions are generated, the project metadata records "captions: auto-generated by Whisper, [date]". Users should always know what came from AI vs what they wrote.
- **Rate-limit AI calls.** Max 10 AI prompts per minute per user. Cloudflare Worker abuse will burn through the free tier.
- **Don't claim AI features that aren't real.** No "Coming soon" badges in production. If the prompt-to-edit isn't built yet for a category of action, hide that affordance — don't show a disabled button.

---

## 7. Process rules — the human author stays in the loop

- **Never generate more than one feature at a time.** Build, test, commit. Then next feature. Generating an entire pipeline in one shot guarantees nobody understands any of it.
- **Never commit code the author has not read line-by-line.** The point is that the author understands what was built. Blind acceptance is technical debt with compound interest.
- **Every non-trivial function has a comment explaining *why*, not *what*.** The code says what. The comment says why this approach, what alternative was rejected, what edge case this handles.
- **If a bug is not understood, do not "fix" it by trying random changes.** Stop. Reproduce in console. Read the actual error. Diagnose. Then fix. Vibe-fixing is how `Aw, Snap!` becomes a regular occurrence.
- **Test the smoke flow before pushing.** From `CLIPCUT_EDITING_GUIDE.md` Section 6: import video → add to timeline → play → scrub → switch tabs → export. If any step breaks, don't push.
- **Test the save/restore flow before pushing changes to project state.** Import → add → autosave → close tab → reopen → verify everything restored. This is the most fragile path in the app.

---

## 8. Claude Code session protocol

When starting a Claude Code session:

1. Confirm you have read `CLIPCUT_EDITING_GUIDE.md` and this file.
2. State the single, scoped task for the session. If the task is "build the prompt-to-edit feature", reject the scope and ask for a single phase or single action type instead.
3. Before writing code, state the plan: files to create/modify, dependencies to add (with justification), tests/manual checks to run.
4. Write the code. Run `npm run build`. Run the smoke test from the guide. Show the diff.
5. At the end, summarize what changed, what was *not* done, and what the next session should pick up.

**Refuse to proceed if:**
- The task is "just make it work" with no spec.
- You're asked to add a dependency you can't justify (especially a WASM bundle).
- You're asked to ship something without error handling or a smoke test.
- You're about to generate a gradient hero with "Revolutionize Your Video Editing" in it.
- You're about to bundle multiple unrelated fixes in one commit.

---

## 9. Red flags — stop and ask

If Claude Code is about to:

- Create a file over 400 lines — stop, split it
- Add a 4th dependency in one session — stop, justify each one
- Write a catch block with `// ignore` — stop, handle or propagate
- Duplicate a block of logic across files — stop, extract
- Use `any`, `@ts-ignore`, or `eslint-disable` — stop, fix properly
- Invent a library name that sounds plausible — stop, verify on npm first
- Skip the smoke test "to save time" — stop, the time is saved by catching the regression now
- Touch `VideoEditor.jsx` layout without testing both desktop AND mobile — stop, test both
- Modify `Player.jsx` and conditionally render the `<video>` element — stop, you'll break playback
- Send anything other than a UUID as a Supabase project ID — stop, validate first

---

## 10. The one-line test

Before committing any change, ask:

> "If a user emails me asking why this happened, can I explain it without re-reading the diff?"

If no — don't commit. Go back and understand it.

---

## 11. ClipCut-specific footguns we've already hit

These are real bugs we've fixed. Don't reintroduce them:

- **Captions stuck on "Extracting audio..."** — caused by FFmpeg WASM timing out. Use Web Audio API instead.
- **CSP blocks FFmpeg from loading on deployed site** — fixed by COEP credentialless. Don't add new external CDN dependencies without updating CSP.
- **Cloudflare tunnel returns 1003 "Direct IP Access Not Allowed"** — Workers can't reach raw IPs. Always use a tunnel URL or domain.
- **Supabase 400 on every autosave** — caused by sending `id: 'draft-xxx'` instead of a UUID. Validate.
- **Project "loaded" but media missing** — caused by storing blob URLs in project_data. Use IndexedDB keys, rebuild blob URLs on restore.
- **Inspector covering the preview** — caused by missing flex constraints. The preview must always have its own space.
- **170 caption clips crash Chrome** — group words into longer phrases, virtualize the timeline.
- **Help (?) button covering Filters tab on mobile** — don't use `position: fixed` for floating UI without testing what it overlaps.

---

**This file is read at the start of every Claude Code session. If rules conflict, the stricter rule wins. If something is unclear, ask — do not guess.**
