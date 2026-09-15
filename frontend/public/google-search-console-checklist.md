# Google Search Console checklist

Use this checklist after the production deployment is live.

## 1. Add the production property

Add the production URL property in Google Search Console:

`https://limitlessdesign.vercel.app/`

Prefer a Domain property if DNS access is available. Otherwise use a URL-prefix property for the production origin.

## 2. Submit the sitemap

In Search Console, open **Sitemaps**, enter:

`sitemap.xml`

Submit it and confirm that the status becomes **Success**.

The website already publishes the sitemap at:

`https://limitlessdesign.vercel.app/sitemap.xml`

## 3. Inspect important URLs

Use **URL Inspection** for the homepage first, then inspect these indexable URL groups:

- `/`
- `/about`
- `/contact`
- `/live-projects`
- `/price`
- `/services/logo-design`
- `/services/social-media-banner`
- `/services/photo-frame`
- `/services/poster-design`
- `/services/business-card-design`
- `/services/branding-materials`
- `/services/ui-design`
- `/services/branding-materials/*`

Request indexing for important pages when appropriate. Do not repeatedly request indexing for the same URL.

## 4. Excluded routes

Do not request indexing for:

- `/download/*`
- `/logo-download/*`

These routes are intentionally excluded from the sitemap and blocked in `robots.txt`.

## 5. Monitor indexing

Review **Pages / Indexing** regularly. Watch for:

- Crawled - currently not indexed
- Discovered - currently not indexed
- Duplicate without user-selected canonical
- Alternate page with proper canonical
- Server errors
- Redirect errors

Investigate recurring patterns instead of requesting indexing for every affected URL individually.

## 6. Monitor search performance

In **Performance / Search results**, monitor:

- Total clicks
- Total impressions
- Average CTR
- Average position
- Queries
- Pages
- Countries
- Devices

Compare at least 28-day periods before making SEO changes based on trends.

## 7. Core Web Vitals

Review **Core Web Vitals** and **Page Experience** reports. Prioritize real-user issues affecting important landing pages. Validate improvements with Lighthouse/PageSpeed Insights and then monitor the Search Console report after deployment.

## 8. Backlink acquisition

Build links through genuine, relevant sources such as:

- Business and professional profiles
- Design portfolio profiles
- Case-study publications
- Partner/client mentions
- Relevant design communities
- Original resources that others can reference

Avoid paid link schemes, automated directory spam, link exchanges at scale, and irrelevant backlinks.
