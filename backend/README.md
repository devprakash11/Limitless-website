# Limitless Design Backend

Production API for the Limitless Design website using **Node.js 20 + Express + Supabase + Cloudinary**, deployed as a Vercel serverless function.

## Architecture

```text
backend/
├── api/index.js
├── config/                 # env, Supabase, Cloudinary
├── middleware/             # auth, RBAC, errors
├── routes/                 # public, auth, contact, upload, admin, client
├── services/               # Supabase data, Cloudinary, email
├── supabase/schema.sql     # database + RLS + auth trigger
├── utils/
├── .env.example
├── .vercelignore
├── package.json
└── vercel.json
```

## Features

- Supabase Auth bearer-token verification.
- Profile creation automatically triggered when a Supabase user signs up.
- Roles: `SUPER_ADMIN`, `ADMIN`, `STAFF`, `CLIENT`.
- Public services, projects, pricing and testimonials APIs.
- Admin dashboard, CMS CRUD, enquiries, invoices, payments and user invitations.
- Client dashboard with own projects, invoices and payments.
- Cloudinary authenticated image/PDF uploads and asset deletion.
- Contact enquiry validation, database persistence and email notifications.
- Helmet, CORS, JSON body limits and API rate limiting.
- Zod request validation and generic production error responses.
- Supabase Row Level Security policies included in `supabase/schema.sql`.

## API

```text
GET    /health
GET    /api/auth/me
PATCH  /api/auth/profile

GET    /api/services
GET    /api/projects
GET    /api/pricing
GET    /api/testimonials
POST   /api/contact

POST   /api/uploads
DELETE /api/uploads

GET    /api/admin/dashboard
GET    /api/admin/profiles
PATCH  /api/admin/profiles/:id/role
GET    /api/admin/enquiries
PATCH  /api/admin/enquiries/:id
POST   /api/admin/invoices
POST   /api/admin/payments
POST   /api/admin/users/invite

GET    /api/client/dashboard
GET    /api/client/projects
GET    /api/client/invoices
GET    /api/client/payments
```

## Supabase setup

1. Create a Supabase project.
2. Open **SQL Editor** and run `supabase/schema.sql`.
3. Configure your Auth providers in Supabase Authentication.
4. Copy the project URL and **service role key** into Vercel environment variables.
5. Never expose `SUPABASE_SERVICE_ROLE_KEY` in the frontend.

The service-role key is intentionally server-only. Frontend applications should use Supabase's publishable/anon key only for Supabase Auth sessions.

## Cloudinary setup

Create a Cloudinary account and add the cloud name, API key and API secret to server environment variables. Uploads are limited to 10 MB and support JPEG, PNG, WebP, GIF and PDF.

## Local development

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

The API runs on `http://localhost:3000` by default.

## Vercel deployment

Create a separate Vercel project for the backend and set its **Root Directory** to `backend`. Vercel will use `backend/vercel.json` and `backend/api/index.js`.

Add these environment variables in Vercel:

```text
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.com
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
GMAIL_USER=...
GMAIL_APP_PASSWORD=...
```

Do not commit real credentials. If an old Gmail App Password was ever committed, revoke it and generate a replacement.

## Frontend authentication

After signing in with Supabase Auth, send the access token to the API:

```js
fetch(`${API_URL}/api/auth/me`, {
  headers: { Authorization: `Bearer ${session.access_token}` },
});
```

For uploads, send a `multipart/form-data` request with a `file` field and a server-authenticated session.
