# 🌍 Spotter Take Home

A web application built with Next.js to explore destinations, hotels, and interactive maps.

---

## 🚀 Technologies

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Leaflet](https://leafletjs.com/) for maps
- TypeScript

---

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/AxelSoler/spotter-take-home.git
cd spotter-take-home
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env.local` file

In the root of the project, create a file named `.env.local` and add the following environment variables:

```env
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
NEXT_PUBLIC_API_URL=https://api.example.com
```

> ⚠️ All environment variables prefixed with `NEXT_PUBLIC_` will be exposed to the browser.

---

## ▶️ Running in development

```bash
npm run dev
# or
pnpm dev
```
