# Indaco — Nuxt 4 Legal Documents Prototype

This repository is a complete prototype for the Frontend Software Engineer take-home assignment. It contains a Nuxt 4 frontend and a mock backend powered by `json-server` (db.json) that exposes legal documents as nested `Section` objects.

## Highlights

- Nuxt 4 (TypeScript + `<script setup>` + Composition API)
- Nuxt UI v4 for components and design system
- Pinia for state management
- VueUse for useful composables where appropriate
- Tailwind CSS for utility-first styling
- json-server as a mock REST API (backend/db.json)
- Admin panel with simple auth & document editing flows
- Docker Compose to run frontend + mock-backend together

## What I implemented (deliverable)

- Document listing with searching & client-side filtering
- Document detail view that renders hierarchical `Section` trees with recursive components
- Cross-reference-ready data model (section paths, ids, references)
- Admin panel to edit a document JSON and persist with `PUT`/`PATCH` to the mock API
- Clear README and simple Docker Compose for easy demonstration

## Rationale & trade-offs

- **Server-side rendering (SSR)**: Nuxt 4 default SSR is preserved for public pages (document list & document pages) to aid SEO and first-contentful-paint. Admin area is rendered client-side for simplicity and to avoid exposing admin API routes to search engines. See `nuxt.config.ts` for comments.

- **Mock backend**: `json-server` offers a fast, zero-friction mock API. It is not a production backend and authentication is only mocked for evaluation purposes.

- **Admin editing**: Rather than implementing a full tree editor for nested `Section` objects (which is large and time-consuming), the prototype provides an inline JSON editor + validation to update documents. This demonstrates the editing flow, undo via quick copy/restore, and can be iterated into a fine-grained editor.

- **Design**: Using Nuxt UI and Tailwind reduces UI engineering overhead and produces a professional-looking prototype quickly.

## Quick start (dev)

### Requirements

- Node.js - latest LTS
- npm / pnpm / yarn
- Docker (optional, for docker-compose flow)

### Run with Node (local dev)

1. Install mock API dependencies and start the backend

```bash
cd backend
npm install
npm run dev
# json-server will be available at http://localhost:3001
```

2. Install frontend dependencies and run Nuxt dev server

```bash
cd ../frontend
npm install
npm run dev
# Nuxt dev server usually runs at http://localhost:3000
```

3. Open http://localhost:3000

### Run with Docker Compose

```bash
npm run setup:docker # optional - builds images
docker compose up --build
```

This will expose the frontend on `http://localhost:3000` and mock API on `http://localhost:3001`.

## File map & where to look

- `backend/db.json` — seed data (legal documents) used by json-server
- `frontend/pages/` — main pages: index, document detail, admin
- `frontend/components` — document list, recursive tree renderer, admin editor
- `frontend/composables` — API integration helpers & search utilities
- `frontend/stores` — Pinia store for global documents cache

## How to extend

- Replace JSON editor with a structured tree editor for sections (drag/drop, inline edit)
- Add per-section versioning by adding `versions` array with timestamps
- Add a basic index or full-text search microservice for large datasets
