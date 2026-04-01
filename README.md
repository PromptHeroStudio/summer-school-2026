# IDSS Summer School 2026 — Parent Guide

A modern, responsive web application providing a comprehensive digital guide for parents considering enrolling their child in the **IDSS Summer School 2026** programme in Sarajevo.

## 🚀 Tech Stack

- **React 19** + **TypeScript**
- **Vite 6** (build tool)
- **Tailwind CSS v4**
- **Framer Motion** (animations)
- **Lucide React** (icons)

## 📦 Getting Started

**Prerequisites:** Node.js ≥ 18

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Deployment (Vercel)

This project is configured for zero-config deployment on Vercel.

1. Push to GitHub
2. Import repository in [vercel.com/new](https://vercel.com/new)
3. Leave all settings at defaults — Vercel auto-detects Vite
4. Click **Deploy**

SPA routing is handled via `vercel.json`.

## 📁 Project Structure

```
├── src/
│   ├── App.tsx       # Main application component
│   ├── main.tsx      # React entry point
│   └── index.css     # Global styles & Tailwind theme
├── index.html         # HTML shell
├── vercel.json        # Vercel SPA routing config
├── vite.config.ts     # Vite build configuration
└── tsconfig.json      # TypeScript configuration
```

## 📧 Contact

**IDSS Summer School Team**
- Email: info@idss.ba
- Phone: +387 33 560 520
- Web: [idss.edu.ba](https://idss.edu.ba)
