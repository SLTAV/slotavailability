# Project workflow

The user wants a visible live preview left open while refining the design.

- Reuse the existing preview tab at `http://127.0.0.1:4173/` for subsequent changes.
- Check whether the preview is running before starting another server. Use `npm run dev` for Vite hot updates and the Express API.
- Keep the preview running when finishing a visual-edit task unless the user asks to stop it. This is an explicit user preference.
- Background processes must use hidden windows; keep local logs and process details under ignored `.preview/`.
- Verify the visible result and keep the browser tab as a deliverable. A preview is not a production deployment.

## Provider artwork

For new or revised provider card illustrations, follow the approved detailed adventure style in [docs/provider-card-art-direction.md](docs/provider-card-art-direction.md). Read its reference board and keep the collection consistent. All ten detailed provider images are now integrated in the shared ProviderCard component. Future cards should follow the same direction.
