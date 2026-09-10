# Limitless Design — Website

Portfolio and commission website for **Limitless Design** — a professional graphic, e-commerce storefront, and UI design studio.

## Project Structure

```
Limitless-website/
├── frontend/   — React + Vite SPA (deployed to Vercel)
└── backend/    — Express 5 REST API (deployed to Vercel Serverless)
```

## Frontend

Built with **React**, **React Router**, and **Vite**. All design service pages, portfolio gallery, pricing, and the contact/commission form are part of the SPA.

### Quick start

```bash
cd frontend
npm install
cp .env.example .env.local   # set VITE_API_URL to your backend URL
npm run dev
```

The app runs on `http://localhost:5173` by default.

### Environment variables

| Variable | Description |
|---|---|
| `VITE_API_URL` | Base URL of the backend API (e.g. `http://localhost:3000` locally or your Vercel deployment URL in production) |

## Backend

Production-ready REST API built with **Express 5**, **Supabase** (PostgreSQL + Auth), **Cloudinary** (media storage), and **Nodemailer** (contact email notifications). See [`backend/README.md`](./backend/README.md) for full setup instructions.

### Quick start

```bash
cd backend
npm install
cp .env.example .env   # fill in Supabase and Gmail credentials
npm run dev
```

API runs on `http://localhost:3000` by default.

## API Overview

| Route | Auth | Description |
|---|---|---|
| `GET /health` | Public | Health check |
| `GET /api/services` | Public | Active design services |
| `GET /api/projects` | Public | Published portfolio projects |
| `GET /api/pricing` | Public | Active pricing plans |
| `GET /api/testimonials` | Public | Published testimonials |
| `POST /api/contact` | Public | Submit a project enquiry |
| `GET /api/auth/me` | Bearer JWT | Current user profile |
| `PATCH /api/auth/profile` | Bearer JWT | Update profile |
| `GET /api/client/dashboard` | Bearer JWT | Client projects, invoices, payments |
| `GET /api/admin/dashboard` | Admin JWT | Admin overview |
| `POST /api/admin/invoices` | Admin JWT | Create invoice |
| `POST /api/admin/payments` | Admin JWT | Record payment |
| `POST /api/uploads` | Admin JWT | Upload media to Cloudinary |

## Deployment

Both `frontend/` and `backend/` contain their own `vercel.json` and are deployed as separate Vercel projects.

- **Frontend** — set `VITE_API_URL` in Vercel environment variables to the backend deployment URL.
- **Backend** — set all variables from `backend/.env.example` in Vercel environment variables.

## Contact

**Dev Prakash** — Graphic Designer | UI Designer  
📧 devprakash1162004@gmail.com  
🔗 [linkedin.com/in/dev-prakash11](https://linkedin.com/in/dev-prakash11)  
🎨 [behance.net/devprakash116](https://behance.net/devprakash116)
