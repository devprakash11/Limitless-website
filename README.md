# Limitless Design Website

Limitless Design portfolio and commission website with a React + Vite frontend and a dedicated contact API.

## Architecture

```text
Limitless-website/
├── frontend/                # React + Vite website
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── data/
│   │   ├── pages/
│   │   ├── services/
│   │   └── styles/
│   ├── package.json
│   └── vercel.json
│
├── backend/                 # Contact API only
│   ├── api/index.js
│   ├── src/
│   │   ├── config/
│   │   ├── routes/
│   │   └── services/
│   ├── supabase/schema.sql
│   ├── package.json
│   └── vercel.json
└── .gitignore
```

## Contact flow

```text
Contact page
   ↓
React submitContact()
   ↓
POST /api/contact
   ↓
Express validation + rate limiting + honeypot
   ↓
Supabase contacts table
   ↓
Resend email notification
   ↓
help.limitlessdesign@gmail.com
```

The frontend uses `VITE_API_URL` when provided. In production it falls back to the deployed contact API, while local development uses `http://localhost:5000`.

The backend validates all incoming fields with Zod, limits requests, applies Helmet and CORS, stores enquiries with a `NEW` status, and sends email notifications through Resend. The Supabase service-role key is server-only.

## Backend setup

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Local API:

```text
GET  http://localhost:5000/health
POST http://localhost:5000/api/contact
```

Run `backend/supabase/schema.sql` in the Supabase SQL Editor before submitting real enquiries.

## Backend environment variables

```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
RESEND_API_KEY=re_your_api_key
CONTACT_EMAIL=help.limitlessdesign@gmail.com
RESEND_FROM_EMAIL=Limitless Design <onboarding@resend.dev>
```

For production, use a verified Resend sender domain and set `FRONTEND_URL` to the production frontend origin.

## Frontend development

```bash
cd frontend
npm ci
npm run dev
```

The frontend normally runs at `http://localhost:5173`.

## Frontend production build

```bash
cd frontend
npm ci
npm run build
```

## Vercel

Frontend Vercel project:

- Root Directory: `frontend`
- Build Command: `npm run build`

Backend Vercel project:

- Root Directory: `backend`
- Build Command: `npm run build`
- Entry point: `api/index.js`

Required backend production variables:

- `FRONTEND_URL`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- `CONTACT_EMAIL`
- `RESEND_FROM_EMAIL`
- `NODE_ENV=production`

Never commit `.env` or API keys.

## Design system

`frontend/src/styles/design-system.css` is the single stylesheet entry imported by `main.jsx`. Shared styling remains organized across the global, component, page and security style layers.

## Routes

The frontend contains the studio homepage, about, contact, pricing, live projects, service pages, download previews, and fallback route.

## License

Private project for Limitless Design.
