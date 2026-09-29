# FeedbackLoop client (UI)

    cd client
    cp .env.example .env
    npm install
    npm run dev        # http://localhost:5173, runs on mock data

## Going live
1. Set `VITE_USE_MOCKS=false` in `.env`.
2. The backend needs these routes (shapes are in `src/types.ts`):
   - `GET /api/overview` -> `Overview`
   - `GET /api/feedback` -> `FeedbackItem[]`
   - `GET /api/patterns` -> `Pattern[]`
   - `GET /api/memory` -> `MemoryOverview` (built from retain/recall/reflect activity)
   - `POST /api/ask` `{ question }` -> `AskResponse` (from Hindsight reflect)
3. Different route names or fields? Edit only `src/api/index.ts` and `src/types.ts`; the compiler flags every screen affected.
4. Delete `src/mocks/` once real data flows.

`npm run dev` proxies `/api` to `http://localhost:3001` (see `vite.config.ts`). No API keys live in the client.
