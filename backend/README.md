# Limitless Design Contact API

Contact API for the Limitless Design frontend. It stores enquiries in Supabase and sends two transactional emails through Gmail SMTP: one notification to the admin and one confirmation to the person who submitted the form.

## Stack

- Node.js + Express
- Supabase PostgreSQL
- Nodemailer + Gmail SMTP
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

## Gmail SMTP

Use a Google account dedicated to sending website emails when possible. Enable 2-Step Verification on that account and create a Google App Password. Do not use the normal Gmail account password.

Set these values in `.env`:

```env
GMAIL_USER=help.limitlessdesign@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password
CONTACT_EMAIL=help.limitlessdesign@gmail.com
```

The backend uses `GMAIL_USER` as the sender. `CONTACT_EMAIL` receives the admin notification. The visitor's submitted email receives the confirmation message.

## Supabase

1. Create a Supabase project.
2. Open SQL Editor.
3. Run `supabase/schema.sql`.
4. Copy the project URL and service-role key into `.env`.

The service-role key is server-only and must never be added to the frontend.

## Frontend

Set the frontend environment variable:

```env
VITE_API_URL=http://localhost:5000
```

For production, set it to the deployed backend URL.

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

## Email flow

After a valid submission:

1. The enquiry is saved in Supabase.
2. The admin receives the enquiry details at `CONTACT_EMAIL`.
3. The visitor receives a confirmation at the submitted email address.
4. If email delivery fails, the API reports the failure instead of claiming that the email was sent.

## Deployment on Vercel

Set the Vercel project Root Directory to `backend`. Vercel will use `api/index.js` as the serverless entry point.

Required environment variables:

- `FRONTEND_URL`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `GMAIL_USER`
- `GMAIL_APP_PASSWORD`
- `CONTACT_EMAIL`
- `NODE_ENV=production`

Never commit `.env` or secret keys.
