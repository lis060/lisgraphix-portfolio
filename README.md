# Lisgraphix Portfolio

> "I build websites that bring customers" — Premium web design & software studio based in Accra, Ghana.

## Tech Stack

- **Client:** React 18 + Vite + TypeScript + Tailwind CSS + Framer Motion
- **Server:** Node.js + Express + Nodemailer

## Getting Started

### 1. Install dependencies

```bash
npm run install:all
```

### 2. Configure environment

```bash
cp server/.env.example server/.env
# Fill in your SMTP credentials in server/.env
```

### 3. Run development servers

```bash
npm run dev
```

- Client: http://localhost:5173
- Server: http://localhost:5174

## Project Structure

```
├── client/          # React + Vite frontend
├── server/          # Express API backend
├── package.json     # Workspace root
```

## Deployment

- **Client:** Deploy `client/dist` to Vercel, Netlify, or any static host.
- **Server:** Deploy to Railway, Render, or a VPS. Set all env vars from `.env.example`.
- Update `CLIENT_ORIGIN` env var on the server to match your production frontend URL.
- Update `vite.config.ts` proxy target to your production API URL for the build.

## Contact

- Email: lisgraphix17@gmail.com
- WhatsApp: +233544490241
- TikTok: https://www.tiktok.com/@lisgraphix
