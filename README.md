# LOGIX — Software & Digital Solutions

A bilingual Arabic/English marketing website starter built with Next.js, TypeScript and Tailwind CSS.

## Included
- Arabic and English home pages (`/ar`, `/en`)
- RTL/LTR-aware layout and language switcher
- Responsive navigation and mobile menu
- Services, portfolio previews, process, contact CTA
- Contact form with client-side validation and a demo API endpoint
- Metadata, sitemap and robots routes
- Clean component structure and accessible controls

## Requirements
- Node.js 20.9 or newer
- npm

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000. The root redirects to `/ar`.

## Production build
```bash
npm run typecheck
npm run build
npm start
```

## Important before launch
1. Replace demo copy and project examples with verified company information.
2. Connect the contact API to a real email provider or database. The current endpoint validates and acknowledges submissions but does not persist them.
3. Add secure authentication before building any admin dashboard.
4. Configure your real domain and `NEXT_PUBLIC_SITE_URL`.
5. Add a privacy policy that reflects actual analytics, forms, and data retention.
6. Do not commit `.env.local`, passwords, or API keys.

## Structure
```text
src/
  app/
    [locale]/page.tsx
    api/contact/route.ts
    globals.css
    layout.tsx
    page.tsx
    robots.ts
    sitemap.ts
  components/
    ContactForm.tsx
    Footer.tsx
    Header.tsx
    Logo.tsx
    SectionHeading.tsx
  lib/
    content.ts
    locale.ts
  types/
    index.ts
public/
  images/
```
