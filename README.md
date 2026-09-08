# Convertly

A unit conversion web application with an Express/Node.js API and a React + Material UI frontend.

## Run locally

Install dependencies from the project root:

```powershell
npm.cmd install
npm.cmd install --prefix backend
npm.cmd install --prefix frontend
```

Start the backend in one terminal:

```powershell
npm.cmd run dev --prefix backend
```

The API runs at `http://localhost:4000`.

Start the frontend in a second terminal:

```powershell
npm.cmd run dev --prefix frontend
```

Open `http://localhost:5173`. Vite proxies `/api` requests to the backend.

To run both processes together, use:

```powershell
npm.cmd run dev
```

## Supported conversions

Length, volume, weight, and temperature conversions are available. The backend exposes `GET /api/units`, `POST /api/convert`, and `GET /api/health`.
