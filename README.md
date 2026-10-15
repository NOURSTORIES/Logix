# Logix — Full-Stack Software Agency & Coding Academy

Arabic-first responsive website for Logix, a software development company and programming education brand.

## Included
- Premium responsive landing page with dark/light theme and Arabic/English toggle
- Services, portfolio, process, learning tracks, pricing, FAQ and contact/project request form
- Frontend: HTML, CSS, vanilla JavaScript
- Backend: Node.js + Express REST API
- Database: PostgreSQL schema and seed data
- Admin API protected with bearer token
- Docker Compose for local PostgreSQL + app

## Quick start (frontend only)
Open `frontend/index.html` in a browser. The website works as a static showcase; project requests require the backend.

## Full-stack setup
1. Install Node.js 20+ and Docker Desktop (or have PostgreSQL installed).
2. Copy `.env.example` to `.env` and change `ADMIN_TOKEN` to a long random secret.
3. Run:
   ```bash
   docker compose up --build
   ```
4. Open `http://localhost:3000`.
5. Health check: `http://localhost:3000/api/health`

## API
- `GET /api/health`
- `POST /api/requests` — public project/course inquiry
- `GET /api/admin/requests` — requires `Authorization: Bearer YOUR_ADMIN_TOKEN`
- `PATCH /api/admin/requests/:id` — update status; requires admin token

## Deploying on GitHub
Upload all files in this folder to a GitHub repository. GitHub Pages can host only the static frontend; it will not run the Node backend or PostgreSQL. For a working full-stack deployment, deploy the app to a Node-capable host and PostgreSQL provider, then configure environment variables. Never commit `.env` or real credentials.

## Production checklist
- Configure HTTPS and real environment secrets.
- Add rate limiting, CAPTCHA, email notifications and proper admin login before public production use.
- Add a managed image/CDN provider if you want to upload your own portfolio images.
- Review privacy policy and local data-protection requirements before collecting real customer data.
