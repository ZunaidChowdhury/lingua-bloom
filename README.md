# LinguaBloom — Frontend

Next.js (App Router) client for [LinguaBloom](https://github.com/ZunaidChowdhury/lingua-bloom-server), an AI-powered English-learning chatbot for children under 7.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. The backend must run on http://localhost:8000.

| Command | Purpose |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run lint` | ESLint (incl. `no-explicit-any`) |
| `npx tsc --noEmit` | Type check |
| `npm test` | Vitest unit tests |

## Environment

Only one variable is exposed to the browser:

| Variable | Example | Purpose |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | `http://localhost:8000` | Base URL of the FastAPI backend |

Copy `.env.example` to `.env.local`. Nothing secret may use a `NEXT_PUBLIC_` prefix.

## Security headers

`next.config.ts` sets these on every response:

- `Content-Security-Policy` — `default-src 'self'`, `frame-ancestors 'none'`, `object-src 'none'`, `base-uri 'self'`, `img-src 'self' data:`, `connect-src 'self'` plus the API origin, and `script-src`/`style-src` as below.
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `X-Frame-Options: DENY`
- `Permissions-Policy` — camera, microphone, geolocation, and similar sensors all denied.

### CSP `script-src` trade-off

Next.js injects inline bootstrap and React Flight scripts into the HTML shell, so `script-src` includes `'unsafe-inline'`. Dropping it breaks the application shell. The risk is contained because:

- The app never renders user-supplied HTML; all bot text is rendered as React text nodes.
- `frame-ancestors 'none'` / `X-Frame-Options: DENY` block clickjacking.
- `connect-src` allows only `'self'` and the known API origin, limiting data exfiltration paths.

In development only, the CSP additionally allows `'unsafe-eval'` and `ws:` for Turbopack HMR and the error overlay; production responses never include them.
