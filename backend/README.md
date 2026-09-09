# Limitless Design Backend

Production-ready REST API for the Limitless Design website.

## Stack

- Node.js 20+
- Express 5
- Supabase PostgreSQL + Supabase Auth
- Cloudinary for media storage
- Nodemailer for contact notifications
- Zod for request validation
- Helmet, CORS and express-rate-limit for API security
- Vercel Serverless Functions deployment

Supabase Auth owns identity and JWT issuance. The API accepts `Authorization: Bearer <access_token>` and validates the token with Supabase before protected operations.

## Structure

```text
backend/
├── api/
│   └── index.js
├── config/
│   ├── cloudinary.js
│   ├── env.js
│   ├── mailer.js
│   └── supabase.js
├── middleware/
│   ├── auth.js
│   └── error.js
├── routes/
│   ├── admin.js
│   ├── auth.js
│   ├── client.js
│   ├── contact.js
│   ├── public.js
│   ├── resource.js
│   └── uploads.js
├── services/
│   ├── cloudinaryService.js
│   ├── database.js
│   └── emailService.js
├── supabase/
│   └── schema.sql
├── utils/
│   ├── api.js
│   └── escapeHtml.js
├── .env.example
├── package.json
└── vercel.json
```

## Local setup

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

API runs on `http://localhost:3000` by default.

## Supabase setup

1. Create a Supabase project.
2. Open SQL Editor.
3. Run `backend/supabase/schema.sql`.
4. Copy the project URL and **service role key** into `.env`.
5. Configure Auth providers in Supabase Authentication.
6. Set your frontend URL/redirect URLs in Supabase Auth settings.

Never expose `SUPABASE_SERVICE_ROLE_KEY` in the frontend. The backend uses it only for trusted server operations.

## Cloudinary setup

Create a Cloudinary account and add these server-only values:

```env
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
CLOUDINARY_FOLDER=limitless-design
MAX_UPLOAD_MB=8
```

Uploads are performed server-side and stored in `media_assets`. Keep the Cloudinary API secret server-side.

## Vercel deployment

Deploy the `backend` directory as a separate Vercel project.

- **Root Directory:** `backend`
- **Framework Preset:** Other
- **Build Command:** leave empty/default
- **Install Command:** `npm install`
- **Node.js:** 20+

Add all `.env` values in Vercel Project Settings → Environment Variables.

The server exports the Express application from `api/index.js` and Vercel runs it as a Node.js serverless function.

Your API URL will look like:

```text
https://limitless-backend.vercel.app
```

Then set the frontend:

```env
FRONTEND_URL=https://your-frontend.vercel.app
ALLOWED_ORIGINS=https://your-frontend.vercel.app
```

## API endpoints

### Public

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/health` | Liveness check |
| GET | `/health/ready` | Supabase readiness check |
| GET | `/api/services` | Published services |
| GET | `/api/services/:id` | Service detail |
| GET | `/api/projects` | Published projects |
| GET | `/api/projects/:id` | Project detail |
| GET | `/api/pricing` | Active pricing plans |
| GET | `/api/testimonials` | Published testimonials |
| POST | `/api/contact` | Create contact/project enquiry |

### Authentication

Authentication itself is handled by Supabase Auth on the frontend. The backend validates the resulting JWT.

| Method | Endpoint | Auth |
|---|---|---|
| GET | `/api/auth/me` | User |
| PATCH | `/api/auth/profile` | User |

### Client portal

| Method | Endpoint | Auth |
|---|---|---|
| GET | `/api/client/dashboard` | User |
| GET | `/api/client/projects` | User |
| GET | `/api/client/invoices` | User |
| GET | `/api/client/payments` | User |

### Admin

Roles: `SUPER_ADMIN`, `ADMIN`, `STAFF`, `CLIENT`.

| Method | Endpoint | Role |
|---|---|---|
| GET | `/api/admin/dashboard` | Admin/Staff |
| GET | `/api/admin/profiles` | Admin/Staff |
| PATCH | `/api/admin/profiles/:id/role` | Super Admin |
| POST | `/api/admin/users/invite` | Super Admin |
| POST | `/api/admin/invoices` | Admin/Staff |
| POST | `/api/admin/payments` | Admin/Staff |
| GET | `/api/admin/enquiries` | Admin/Staff |
| PATCH | `/api/admin/enquiries/:id` | Admin/Staff |
| POST/PATCH/DELETE | `/api/services/*` | Admin/Staff |
| POST/PATCH/DELETE | `/api/projects/*` | Admin/Staff |
| POST/PATCH/DELETE | `/api/pricing/*` | Admin/Staff |
| POST/PATCH/DELETE | `/api/testimonials/*` | Admin/Staff |

### Media

```text
POST   /api/uploads
DELETE /api/uploads/:id
```

Upload with `multipart/form-data` using the field name `file` and an optional `folder` field. Supported files are JPEG, PNG, WebP, GIF and PDF.

## Frontend request example

```js
const { data: { session } } = await supabase.auth.getSession();

const response = await fetch(`${import.meta.env.VITE_API_URL}/api/client/dashboard`, {
  headers: {
    Authorization: `Bearer ${session.access_token}`,
  },
});

const result = await response.json();
```

## Security notes

- Keep Supabase service-role and Cloudinary API secrets server-side.
- Use Supabase Auth for login/signup/password recovery/social providers.
- Use the backend only with access tokens issued by Supabase.
- RLS is enabled in `schema.sql` for direct Supabase access.
- Admin operations use the service role only after API-level RBAC checks.
- Uploads are memory-buffered and capped by `MAX_UPLOAD_MB`.
- Contact input is validated and HTML-escaped before email rendering.
- CORS is restricted to configured frontend origins.
