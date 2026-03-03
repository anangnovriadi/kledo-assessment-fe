# Frontend Assessment — Indonesia Region Filter

A cascading region filter for Indonesia (Province, City/Regency, District) built with **React**, **Vite**, and **Tailwind CSS**.

## Tech Stack

- [React 18](https://react.dev)
- [Vite 5](https://vitejs.dev)
- [React Router DOM v6](https://reactrouter.com)
- [Tailwind CSS v3](https://tailwindcss.com)
- [Lucide React](https://lucide.dev)

---

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org) version **18** or higher
- **npm** version **8** or higher

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/username/kledo-assesment-fe.git
   cd kledo-assesment-fe
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

---

## Running the App

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Production Build

```bash
npm run build
```

Build output will be saved to the `dist/` folder.

### Preview Build

```bash
npm run preview
```

---

## Deploy to Vercel

### Via CLI

```bash
npm i -g vercel
vercel
```

### Via Dashboard

1. Push the project to GitHub
2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. Import the repo and select **Vite** as the framework
4. Click **Deploy**

---

## Project Structure

```
├── public/
│   └── data/
│       └── indonesia_regions.json   # Indonesia region data
├── src/
│   ├── App.jsx                      # Main component
│   ├── main.jsx                     # Entry point
│   └── index.css                    # Global styles
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```
