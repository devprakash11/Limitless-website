# Limitless Design Backend

Netlify Functions backend for the Limitless Design website.

## Structure

```text
backend/
├── functions/
│   └── send-email.js
├── config/
│   └── mailer.js
├── constants/
│   └── services.js
├── services/
│   └── emailService.js
├── utils/
│   ├── escapeHtml.js
│   ├── requestSecurity.js
│   ├── responses.js
│   └── validation.js
├── .env.example
├── netlify.toml.example
└── package.json
```

## Security included

- Secrets are read only from server environment variables.
- Server-side required-field validation.
- Email, phone, service and message validation.
- Maximum request-body size.
- Maximum field lengths.
- HTML escaping before user content is inserted into email HTML.
- Subject-line CR/LF removal.
- Generic public server errors.
- Detailed errors remain in server logs.
- Optional exact-origin validation using `ALLOWED_ORIGIN`.
- Server-side honeypot support through the `website` field.

## Important: rotate the old Gmail App Password

If the old password was ever committed to GitHub, revoke it in your Google
Account and generate a new App Password. Never reuse the exposed password.

## Netlify environment variables

Add these in Netlify:

```text
GMAIL_USER
GMAIL_APP_PASSWORD
```

Optional:

```text
ALLOWED_ORIGIN=https://limitlessdesign.netlify.app
```

Do not commit the actual values.

## Frontend change

Your contact form should also send the existing honeypot field to the function:

```js
body: JSON.stringify({
  name: formData.name.trim(),
  email: formData.email.trim(),
  phone: formData.phone.trim(),
  service: formData.service,
  message: formData.message.trim(),
  website: formData.website.trim(),
})
```

The backend still works if `website` is omitted, but sending it enables the
server-side honeypot.

## Netlify

If the repository structure is:

```text
Limitless-website/
├── frontend/
├── backend/
└── netlify.toml
```

point Netlify's functions directory at:

```text
backend/functions
```

See `netlify.toml.example`.

## Additional production protection

For a public contact endpoint, also configure platform-level rate limiting
and/or a CAPTCHA such as Cloudflare Turnstile. Do not implement critical
rate limits only with an in-memory JavaScript object in a serverless
function, because serverless instances are not guaranteed to share memory.
