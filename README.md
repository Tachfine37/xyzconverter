# New Hope - File Format Converter

A privacy-first, client-side file format converter built with Vite, React, and TypeScript.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## Project Info

- **Framework:** Vite 7.2.4 + React 19.2.0
- **Language:** TypeScript 5.9.3 (strict mode)
- **Bundle Size:** ~194 KB (production)
- **Dev Server:** Starts in ~1.3s

## Project Structure

```
src/
├── components/    # React components
├── hooks/         # Custom React hooks
├── utils/         # Utility functions
├── assets/        # Static assets
├── App.tsx        # Main app component
└── main.tsx       # Entry point
```

## Architecture Notes

- **Client-Side Processing:** All conversions happen in the browser for maximum privacy
- **SEO-Ready Routing:** React Router v6 (Story 1.2)
- **Design System:** Tailwind CSS + shadcn/ui (Story 1.3)
- **Deployment:** Vercel (Story 1.4)

## Additional Vite Template Info

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
