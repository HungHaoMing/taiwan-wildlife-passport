# Project Working Agreement

## Start every task

1. Read `HANDOFF.md` for current decisions, known uncertainties, and release checks.
2. Read `README.md` for participant, staff, configuration, and deployment behavior.
3. Inspect `git status -sb` before editing. Preserve all user work and keep unrelated changes out of commits.

The task is complete only when the requested behavior works, `npm test` and `npm run build` pass, relevant mobile UI is checked, and the handoff documents still describe reality.

## User collaboration

- Communicate in Taiwan Traditional Chinese unless the user requests another language.
- Lead with the result and use plain language. Surface uncertainty instead of silently inventing content.
- Treat the user as the owner of event content and visual direction. Keep implementation choices simple and explain material tradeoffs.
- When publishing is requested, use an intentional commit on an `agent/*` branch, open a PR to `main`, merge it, wait for GitHub Pages Actions, and verify the live asset or page before saying it is deployed.

## Visual assets

- Use only formal images supplied by the user. AI-generated images, self-drawn formal artwork, downloaded images, and questionable third-party assets are outside this project.
- Missing formal assets use labeled placeholders or simple geometry so functionality can continue.
- Deterministic processing of user-supplied files is allowed when needed for format, transparency, sizing, or layout. Preserve the source file and record the derivative in `docs/ASSET_PROVENANCE.md`.
- Preserve every user-supplied source image unchanged. Apply placement, rotation, and other display-only adjustments through configuration unless the user explicitly requests a derived asset.

## Source of truth

- Keep event text, translations, asset paths, QR tokens, card dimensions, placements, animation, audio, and staff settings in `src/config/eventConfig.js`.
- Components render configuration; they do not duplicate work names, tokens, image paths, or coordinates. The legacy `animals` field name may remain for storage compatibility.
- Do not infer work names, themes, or descriptions from the supplied images. Use only content confirmed by the project owner.
- Keep all canvas inputs under `public/` to avoid cross-origin export failures.

## Engineering constraints

- Keep this a small static Vite site suitable for a GitHub Pages project subpath. Prefer browser storage and avoid a backend or paid service.
- Design mobile-first for iPhone Safari and Android Chrome. Preserve touch target size, keyboard access, readable contrast, image alt text, and reduced-motion behavior.
- Browser data is local-only. Changes must not imply login, cloud sync, or secure server authentication.
- Staff PIN and QR tokens are convenience barriers in public client code, never security claims.
- Keep participant progress compatible when changing UI or assets; avoid changing animal IDs or storage shape without a migration.

## Verification

- Run `npm test` and `npm run build` after code, configuration, or asset changes.
- For card-layout work, inspect a narrow mobile viewport with zero and seven stamps, saved handwriting, and a long keyboard message. Check the completion date only when its placement is enabled.
- For derived images, check dimensions, alpha transparency, and preservation of the supplied source file.
- Real iPhone and Android checks remain required for camera permission, touch drawing, orientation, download/share, long-press save, and offline behavior.
- Never claim GitHub deployment from a local push alone. Confirm the Pages workflow succeeds and the live site serves the new revision.
