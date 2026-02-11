# Binance Live Chart

A real-time cryptocurrency price tracking application powered by Binance WebSocket API. Built with **React 19**, **Vite 8**, **Tailwind CSS v4**, and the **ReUI** design system — featuring live area charts, multi-coin support, dark/light theme, and i18n (TR/EN/DE).

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8_beta-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Features

- **Real-Time Data** — Live price streaming via Binance WebSocket (1s interval)
- **6 Cryptocurrencies** — BTC, ETH, BNB, SOL, XRP, ADA with USDT pairs
- **Interactive Area Chart** — Recharts-based smooth gradient chart with custom tooltips
- **Dark / Light Theme** — Binance-inspired dark mode as default, toggleable
- **Multi-Language (i18n)** — Turkish, English, German with full translations
- **Mobile Responsive** — Hamburger menu with liquid glass UI buttons
- **Atomic Design** — Structured as atoms, molecules, organisms, templates
- **ReUI Design System** — CSS variable-based theming with Radix UI primitives
- **Live Page Title** — Browser tab shows current price in real-time
- **Binance Trade Link** — Direct link to trade the selected coin on Binance
- **20 Unit Tests** — Vitest + Testing Library coverage

## 🛠 Tech Stack

| Category | Technology |
|---|---|
| Framework | React 19 |
| Build Tool | Vite 8.0.0-beta |
| Styling | Tailwind CSS v4, ReUI Design System |
| Charts | Recharts |
| State | React Context + Custom Hooks |
| i18n | i18next, react-i18next |
| UI Primitives | Radix UI |
| Icons | Lucide React |
| Animation | Motion (Framer Motion) |
| Testing | Vitest 4, Testing Library, jsdom |
| Deployment | Vercel |

## 📁 Project Structure

```
src/
├── components/
│   ├── atoms/          # Card, Button, ScrollToTop
│   ├── molecules/      # ThemeToggle, LanguageSelector
│   └── organisms/      # Navbar, LiveChart, Footer
├── contexts/           # ThemeContext (dark/light)
├── hooks/              # useMultiCryptoWebSocket
├── i18n/
│   └── locales/        # tr.json, en.json, de.json
├── lib/                # utils (cn helper)
├── utils/              # console-art
└── __tests__/          # Vitest test suites
```

## 🚀 Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Run tests
pnpm test
```

## 📸 Preview

| Dark Mode | Light Mode |
|---|---|
| Default Binance-inspired dark theme with `#09090b` background | Clean white theme with full contrast |

## 🌐 Deployment

Configured for **Vercel** with SPA rewrites. Push to `main` branch for automatic deployment.

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

## 📄 License

MIT