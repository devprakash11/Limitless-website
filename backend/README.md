# Limitless Design Contact Backend

This backend contains only the API required by the website Contact page.

## What it does

- Validates contact form submissions with Zod.
- Rejects abusive request bursts with rate limiting.
- Stores enquiries in Supabase in `contact_enquiries`.
- Sends a notification email to Limitless Design.
- Sends a confirmation email to the person who submitted the form.
- Supports Vercel deployment through `api/index.js`.

## API

### `POST /api/contact`

Request body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 9876543210",
  "service": "UI Design",
  "message": "I need a UI design for my new website.",
  "website": ""
}
```

`website` is a honeypot field. Normal users should leave it empty.

### `GET /health`

Returns the API health status.

## Environment variables

Copy `.env.example` to `.env` for local development and configure:

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `MAIL_FROM`
- `CONTACT_EMAIL`
- `FRONTEND_URL`
- `ALLOWED_ORIGINS`

## Database

Run `supabase/schema.sql` in the Supabase SQL editor. It creates only the `contact_enquiries` table and its required index, trigger, and RLS configuration.

## Local development

```bash
npm install
npm run dev
```

The API runs on `http://localhost:3000` by default.

## Frontend

Set `VITE_API_URL` in the frontend deployment to the deployed backend URL. The frontend service exposes only `submitContact` for this backend.
