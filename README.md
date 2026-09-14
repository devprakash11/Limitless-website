# Limitless Design Website

Frontend-only portfolio and commission website for **Limitless Design**.

The project is a React + Vite single-page application containing the studio homepage, service pages, portfolio work, pricing, live projects, SEO metadata, and contact experience.

## Architecture

```text
Limitless-website/
├── frontend/
│   ├── public/              # Static images, logos, sitemap and robots.txt
│   ├── src/
│   │   ├── components/      # Reusable UI, service, portfolio, SEO and security components
│   │   ├── data/            # Static service and page content
│   │   ├── pages/           # Route-level pages
│   │   ├── services/        # External service integrations
│   │   └── styles/          # Global design system and page/component styles
│   ├── package.json
│   ├── package-lock.json
│   └── vercel.json
├── .gitignore
└── README.md
```

There is intentionally **no Express, Supabase, Cloudinary, Nodemailer, authentication, database, or backend directory** in this repository.

## Contact submission

The Contact page uses **FormSubmit AJAX** as the form delivery service. The browser sends validated form data directly to the Limitless Design email endpoint, so no custom backend is required.

Before production use, the first FormSubmit submission must be confirmed from the receiving mailbox. FormSubmit also provides spam protection and supports cross-origin AJAX submissions.

The contact flow still keeps client-side validation, a honeypot field, loading state, error state, and success state in the React application.

## Tech stack

- React 19
- Vite 8
- React Router 7
- React Helmet Async
- Lucide React
- React Icons
- Plain CSS with a shared design-system entry

All dependency versions are pinned for reproducible installs.

## Local development

```bash
cd frontend
npm ci
npm run dev
```

The development server normally runs at `http://localhost:5173`.

## Production build

```bash
cd frontend
npm ci
npm run build
npm run preview
```

The generated production files are written to `frontend/dist`.

## Vercel deployment

The Vercel project should use `frontend` as its project root, with the standard Vite build command:

```text
npm run build
```

No backend URL or server environment variable is required by the application.

## Design system

`frontend/src/styles/design-system.css` is the single stylesheet entry imported by `main.jsx`. It loads the shared base styles and the component/page styles in a controlled order.

Shared tokens, reset rules, typography, containers, common cards, buttons, and responsive foundations remain centralized in `global.css`.

## Performance

Portfolio images use modern WebP assets where available, lazy loading for below-the-fold content, asynchronous image decoding, and stable media containers to reduce layout shift.

For future asset batches, oversized source images should be converted to appropriately sized WebP/AVIF variants before being committed.

## Routes

The application includes the main studio pages, service pages, pricing, contact, live projects, download previews, and a fallback route. Service and portfolio content is data-driven and rendered through reusable components.

## License

Private project for Limitless Design.
