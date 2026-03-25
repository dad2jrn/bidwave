# BidWave 🌊

[![React](https://img.shields.io/github/package-json/dependency-version/dad2jrn/bidwave/react?style=flat-square&logo=react&logoColor=61DAFB&label=React&color=20232a)](https://react.dev/)
[![TypeScript](https://img.shields.io/github/package-json/dependency-version/dad2jrn/bidwave/dev/typescript?style=flat-square&logo=typescript&logoColor=white&label=TypeScript&color=3178C6)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/github/package-json/dependency-version/dad2jrn/bidwave/dev/vite?style=flat-square&logo=vite&logoColor=white&label=Vite&color=646CFF)](https://vitejs.dev/)
[![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![License](https://img.shields.io/github/license/dad2jrn/bidwave?style=flat-square&color=green)](LICENSE)
[![Last Commit](https://img.shields.io/github/last-commit/dad2jrn/bidwave?style=flat-square&logo=github&logoColor=white)](https://github.com/dad2jrn/bidwave/commits/main)
[![Issues](https://img.shields.io/github/issues/dad2jrn/bidwave?style=flat-square&logo=github&logoColor=white)](https://github.com/dad2jrn/bidwave/issues)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square&logo=git&logoColor=white)](https://github.com/dad2jrn/bidwave/pulls)

A modern, single-page auction web application built with **React 18**, **TypeScript**, and **Vite**. BidWave allows users to browse live auctions, list items for sale, place bids, and track auction countdowns — all with no backend required. Data is persisted locally using the browser's `localStorage` API.

> **Note:** This project is a learning exercise designed to explore React and TypeScript fundamentals. It intentionally uses `localStorage` as a flat-file data store in place of a traditional database or API.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [React 18](https://react.dev/) |
| Language | [TypeScript 5](https://www.typescriptlang.org/) |
| Build Tool | [Vite](https://vitejs.dev/) |
| Routing | [React Router v6](https://reactrouter.com/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Persistence | Browser `localStorage` (JSON flat-file) |

---

## Features

- **Browse Auctions** — View all active listings in a responsive grid
- **Search & Filter** — Filter by keyword or category in real time
- **Create Listings** — Post items with title, description, category, image, and starting bid
- **Bid on Items** — Place bids with live validation against the current high bid
- **Countdown Timers** — Each listing displays time remaining until auction close
- **Persistent Data** — All listings and bids survive page refreshes via `localStorage`

---

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js** `v18.0.0` or higher — [Download](https://nodejs.org/)
- **npm** `v9.0.0` or higher (bundled with Node.js)
- **Git** — [Download](https://git-scm.com/)

To verify your versions:

```bash
node --version
npm --version
git --version
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/dad2jrn/bidwave.git
```

### 2. Navigate into the project directory

```bash
cd bidwave
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The app will be available at **[http://localhost:5173](http://localhost:5173)**. The development server supports hot module replacement (HMR) — changes you make to source files are reflected in the browser instantly without a full reload.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the local development server |
| `npm run build` | Compile and bundle the app for production |
| `npm run preview` | Locally preview the production build |
| `npm run lint` | Run ESLint across the source files |

---

## Project Structure

```
bidwave/
├── public/                 # Static assets (not processed by Vite)
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Navbar.tsx
│   │   └── ListingCard.tsx
│   ├── data/
│   │   └── seed.ts         # Initial seed listings loaded on first run
│   ├── hooks/
│   │   └── useListings.ts  # Custom hook — data layer (localStorage read/write)
│   ├── pages/
│   │   ├── BrowsePage.tsx        # Home page — listing grid with search & filter
│   │   ├── CreateListingPage.tsx # Form to post a new auction
│   │   └── ListingDetailPage.tsx # Individual listing with bid history
│   ├── types/
│   │   └── index.ts        # TypeScript interfaces and shared types
│   ├── App.tsx             # Root component with route definitions
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles (Tailwind import)
├── index.html              # Single HTML file for the SPA
├── tsconfig.json           # TypeScript compiler configuration
├── vite.config.ts          # Vite build configuration
└── package.json            # Project metadata and dependencies
```

---

## Data Model

All data is stored as JSON in `localStorage` under the key `bidwave_listings`. On first load, the app seeds itself with a small set of sample auction listings.

```typescript
interface Listing {
  id: string;
  title: string;
  description: string;
  category: Category;
  imageUrl: string;
  startingBid: number;
  currentBid: number;
  sellerName: string;
  endsAt: string;     // ISO 8601 date string
  createdAt: string;  // ISO 8601 date string
  bids: Bid[];
}

interface Bid {
  id: string;
  listingId: string;
  bidderName: string;
  amount: number;
  placedAt: string;   // ISO 8601 date string
}
```

---

## Resetting Local Data

Since all data lives in `localStorage`, you can reset the app to its seed state at any time:

1. Open **DevTools** in your browser (`F12` or `Cmd+Option+I` on Mac)
2. Navigate to **Application** → **Local Storage** → `http://localhost:5173`
3. Right-click `bidwave_listings` and select **Delete**
4. Refresh the page — seed data will be restored automatically

---

## Roadmap

- [ ] User authentication (login / registration)
- [ ] Image upload support
- [ ] Email notifications on outbid
- [ ] FastAPI backend to replace `localStorage`
- [ ] PostgreSQL persistence layer

---

## Contributing

This is a personal learning project, but feedback and suggestions are welcome. Feel free to open an issue or submit a pull request.

---

## License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

<p align="center">Built with ☕ and curiosity — learning React one component at a time.</p>
