# Gowtham A — Editable Portfolio

A standalone React portfolio with an Express/MongoDB API and a private owner studio.

## Included

- Public portfolio for visitors
- UG SaaS garment-production project showcase
- Editable profile, skills, projects, experience and education
- Private owner route at `/owner`
- Contact form with MongoDB storage and email notification
- Anonymous visitor-session log and first-visit email notification
- Responsive design for desktop and mobile

## Local setup

### API

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### Website

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Public site: `http://localhost:5173`

Owner studio: `http://localhost:5173/owner`

API: `http://localhost:5000/api`

## Required backend environment variables

```env
PORT=5000
MONGODB_URI=mongodb+srv://...
CLIENT_URL=https://your-portfolio.netlify.app
MAIL_USER=your-gmail@gmail.com
MAIL_PASS=your-google-app-password
MAIL_TO=your-notification-email@gmail.com
ADMIN_EMAIL=owner@example.com
ADMIN_PASSWORD=use-a-long-unique-password
JWT_SECRET=use-a-long-random-secret
```

`CLIENT_URL` accepts comma-separated origins. Use a Google App Password for `MAIL_PASS`, not the normal Gmail password.

## Frontend environment variable

```env
VITE_API_URL=https://your-api.onrender.com/api
```

## Deployment

1. Deploy `backend` to Render (or another Node host) and configure the backend variables.
2. Deploy the repository to Netlify. `frontend/netlify.toml` contains the build and SPA redirect settings.
3. Add `VITE_API_URL` in Netlify and redeploy.
4. Add the final Netlify URL to backend `CLIENT_URL` and restart the API.
5. Open `/owner`, sign in with `ADMIN_EMAIL` and `ADMIN_PASSWORD`, then click **Save & Publish** after edits.

The public route never shows the owner controls. Visitor records store a one-way hash of the IP address rather than the raw IP.
