# Convertly

A unit conversion web application with an Express/Node.js API and a React + Material UI frontend.

Convertly allows users to perform different types of unit conversions through a simple web interface.

## Production deployment

The application is deployed on an Azure Linux VM and is available at:

https://convertly-josh.duckdns.org

## Installation

Install dependencies from the project root:

```powershell
npm.cmd install
npm.cmd install --prefix backend
npm.cmd install --prefix frontend
```

## Run locally

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

## Features

The application currently includes:

- Length conversions
- Volume conversions
- Weight conversions
- Temperature conversions
- Speed conversions
- Unit swapping
- Recent conversion history
- Reset functionality
- Input validation
- Error messages for invalid or empty values

## Joshua's contribution

Joshua improved the input validation of the converter.

The application now prevents invalid or empty values from being submitted and displays a clear error message when the input is not valid.

Valid decimal values and existing conversions continue to work normally.

## Alexy's contribution

Alexy added a new speed conversion category.

The new category includes common speed units such as:

- kilometers per hour (km/h)
- miles per hour (mph)
- meters per second (m/s)

## Supported conversions

Length, volume, weight, temperature, and speed conversions are available.

The backend exposes:

- `GET /api/units`
- `POST /api/convert`
- `GET /api/health`
