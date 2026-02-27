# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is currently not compatible with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for tracking the progress.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Deployment (Render)

This project bundles a React frontend with an Express/MongoDB backend. The `package.json` at the repository root drives the build and runtime:

1. **Build step** – `npm install` will run the `postinstall` script which builds the React `dist/` directory.
2. **Start step** – `npm start` launches `node backend/app.js`, serving both API routes and the static frontend.

> Make sure the `backend/` folder is _not_ ignored by git; it contains the server code.

### Environment variables

Set the following variables in Render (or your environment) for the backend to connect to the database:

- `MONGODB_URI` – connection string for MongoDB (e.g. a MongoDB Atlas URI).
- `MONGODB_DB` – database name (defaults to `fedf` if not provided).
- `PORT` – optional, Render will provide a port; defaults to `5000` locally.

### Render configuration

You can optionally add a `render.yaml` file to the repo:

```yaml
services:
  - type: web
    name: p007-app
    env: node
    plan: free
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: MONGODB_URI
        value: "<your-uri>"
      - key: MONGODB_DB
        value: "<db-name>"
```

Adjust the service name, plan, and env vars as needed. The `dist/` directory is ignored by git and created during build.

---
