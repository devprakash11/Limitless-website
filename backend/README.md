# Limitless Design Contact API

Production-oriented contact API for the Limitless Design frontend.

## Stack

- Node.js + Express
- Supabase PostgreSQL
- Resend
- Zod validation
- Helmet
- CORS
- Express rate limiting
- Vercel-compatible deployment

## Local setup

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

The API runs at `http://localhost:5000` by default.

Health check:

```text
GET http://localhost:5000/health
```

Contact endpoint:

```text
POST http://localhost:5000/api/contact
```

## Supabase

1. Create a Supabase project.
2. Open SQL Editor.
3. Run `supabase/schema.sql`.
4. Copy the project URL and service-role key into `.env`.

The service-role key is server-only and must never be added to the frontend.

## Resend

Create a Resend API key and set `RESEND_API_KEY`.
For production, set `RESEND_FROM_EMAIL` to a sender address on a domain verified in Resend. The default `onboarding@resend.dev` value is suitable only for initial testing.

## Frontend

Set the frontend environment variable:

```env
VITE_API_URL=http://localhost:5000
```

For production, set it to the deployed backend URL, for example:

```env
VITE_API_URL=https://your-contact-api.vercel.app
```

Set the backend `FRONTEND_URL` to the exact frontend origin. Multiple origins can be comma-separated.

## Request body

```json
{
  "name": "Client Name",
  "email": "client@example.com",
  "phone": "+91 9876543210",
  "service": "UI Design",
  "message": "I need a complete website UI for my business.",
  "website": ""
}
```

`website` is a honeypot field. A non-empty value is treated as a bot and returns success without storing or emailing the submission.

## Deployment on Vercel

Set the Vercel project Root Directory to `backend`. Vercel will use `api/index.js` as the serverless entry point.

Required environment variables:

- `FRONTEND_URL`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- `CONTACT_EMAIL`
- `RESEND_FROM_EMAIL`
- `NODE_ENV=production`

Never commit `.env` or secret keys.
