# PaxLegis Advocates & Legal Consultants - Website

Next.js App Router + PostgreSQL. The current package uses Next.js 16 and requires Node.js 20.9 or newer. Pages are server-rendered or statically generated for speed and SEO.

## Features
- 7 dedicated practice-area pages (separate URLs for SEO and Google Ads landing pages)
- Practice-specific one-click WhatsApp ("Hi, I need Family Law advice") and Email buttons
- Floating WhatsApp button, "Book Online Consultation" form saved to PostgreSQL
- SEO: unique title/description/keywords, canonical URLs, Open Graph, JSON-LD (LegalService, Service, FAQPage, BreadcrumbList), `sitemap.xml`, `robots.txt`
- Performance: no external fonts or UI libraries, static generation, minimal JS
- Accessibility: skip link, keyboard focus, reduced-motion support, ARIA live form status
- Security: parameterized SQL, input validation, honeypot, basic rate limit, security headers

## Folder structure
```
paxlegis/
├─ app/
│  ├─ layout.js, globals.css       Shared public shell, fonts and design system
│  ├─ page.js                      Home page and firm structured data
│  ├─ [slug]/page.js               Service pages generated from lib/site.js
│  ├─ [slug]/opengraph-image.js    Service-specific social images
│  ├─ opengraph-image.js           Home/default social image
│  ├─ book/page.js                 Online consultation page
│  ├─ api/consultation/route.js    Existing public consultation API
│  ├─ admin/                       Password-protected admin panel
│  ├─ api/admin/                   Protected admin APIs and downloads
│  ├─ manifest.js                  Web app manifest
│  ├─ sitemap.js, robots.js        Search engine routes
│  └─ not-found.js                 Custom 404 page
├─ components/                     Public and admin UI components
├─ lib/site.js                     Firm details, placeholders and all service copy
├─ db/schema.sql                   Consultation and admin database tables
├─ scripts/                        Migration and admin-account commands
├─ middleware.js                   Protects admin pages and APIs
└─ public/                         Favicon and Apple touch icon
```

## Setup
Requirements: Node.js 20.9+ (for the current Next.js package) and PostgreSQL 13+.

```bash
# 1. Install dependencies
npm install

# 2. Create the database
psql -U postgres -c "CREATE DATABASE paxlegis;"

# 3. Configure environment (PowerShell)
Copy-Item .env.example .env
# edit .env: DATABASE_URL, NEXT_PUBLIC_SITE_URL, NEXT_PUBLIC_WHATSAPP,
# NEXT_PUBLIC_EMAIL, NEXT_PUBLIC_PHONE, and AUTH_SECRET

# 4. Create tables
npm run db:migrate

# 5. Create the office admin account; enter the password when prompted
npm run admin:create

# 6. Run development server -> http://localhost:3000
npm run dev
# Open http://localhost:3000/admin to sign in

# Production
npm run build
npm start
```

`AUTH_SECRET` must be a long random string (at least 32 characters). Keep it private and do not commit `.env`. To generate one with Node.js:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"
```

The admin session lasts 8 hours. While entering the password in the terminal, asterisks (`*`) appear instead of the password itself; press Enter to submit. To change or reset an existing account password, run `npm run admin:create` again using the same username, or use **Change password** after signing in.

WhatsApp number format: country code + number, digits only (example `923001234567`).

## Viewing consultation requests
```bash
psql -U postgres -d paxlegis -c "SELECT * FROM consultations ORDER BY created_at DESC;"
```

## Editing content
Firm contact details, public office placeholders, metadata, FAQs and service-page copy are in `lib/site.js`. Each `SERVICES` entry controls its URL slug, navigation label, title, description, keywords, contact message, practice list, step-by-step guidance, FAQ and long-form sections. Edit the relevant object to update its service page and home-page card. The dynamic service route, sitemap, internal links, JSON-LD and social image use this data.

The office address, office hours, experience, bar-council details, official logo and social profiles are deliberately marked `TODO` in `lib/site.js`. Replace them only with verified firm information. Address, hours, logo and social details are omitted from structured data while still marked as placeholders. Enter opening hours in Schema.org format, for example `Mo-Fr 09:00-17:00`.

The public design tokens and responsive styles are in `app/globals.css`. Admin panel styles remain grouped under `.admin-*` selectors.

## Guide for the office operator

1. Open `/admin` and sign in with the username and password provided by the administrator.
2. New requests are marked with a small dot. Select a request to see the full message and contact the person by phone, WhatsApp or email.
3. Choose **New**, **Contacted** or **Closed**, then select **Save status**. Add internal notes and select **Save notes** when needed.
4. Use search, matter, status and date filters to find requests. Select **Download Excel** or **Download CSV** to download the matching requests.
5. Select **Change password** in the top bar to update your password. Select **Sign out** when finished.

Opening a request marks it as read. Deleted requests cannot be restored. Downloads include private contact details, so save them only in an approved, secure location.

## Deployment
Deploy on Vercel, or any VPS with Node + Nginx + PM2 (`pm2 start npm --name paxlegis -- start`). Set the same env variables on the server and run `npm run db:migrate` once.

## Ranking on Google (what code cannot do alone)
1. Set `NEXT_PUBLIC_SITE_URL` to your real domain, deploy over HTTPS.
2. Add the site to Google Search Console and submit `/sitemap.xml`.
3. Create and verify a Google Business Profile with the same name, address and phone.
4. Get genuine reviews and links from legal directories and local listings.
5. Add real office address, lawyer profiles and case-type articles over time. No code can guarantee a #1 position.
6. Replace all `TODO` firm details, verify page titles and descriptions, and test social previews and structured data with Google and social-platform tools.

## Notes
- Replace the placeholder phone, email and WhatsApp number before launch.
- The public form and admin sign-in rate limits are in-memory; use a shared store such as Redis if you run multiple servers.
- Content is general information and should be reviewed by the firm's advocates before publishing.
