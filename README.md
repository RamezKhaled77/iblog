# iBlog

A modern blogging platform built with Next.js 16 and Convex. Readers can browse and search posts, read full articles with real-time presence indicators, and leave comments. Authenticated users can publish their own posts with cover images.

## Overview

iBlog is a full-stack blog application that demonstrates a modern React stack: server-first rendering with Next.js App Router, a reactive serverless database (Convex), and authentication via Better Auth. The UI is built with Tailwind CSS v4 and shadcn/ui-style components, with light/dark theming support.

Core capabilities:

- Public blog feed with post listing and empty-state handling
- Full-text search across post titles and bodies (powered by Convex search indexes)
- Individual post pages with loading skeletons
- Comment threads on every post
- Real-time reader presence on post pages (via `@convex-dev/presence`)
- Email/password sign-up and login
- Post creation with cover image upload to Convex file storage
- Protected routes (`/blog`, `/create`) with optimistic auth redirects
- Dark/light/system theme switching, persisted via `next-themes`
- Toast notifications

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16.3 (App Router, Turbopack, `cacheComponents` enabled) |
| Language | TypeScript 5 (strict mode) |
| UI Library | React 19.2 |
| Styling | Tailwind CSS 4, `tw-animate-css` |
| Components | shadcn CLI-generated components on Base UI (`@base-ui/react`), `lucide-react` icons |
| Backend / Database | Convex (queries, mutations, actions, full-text search indexes, file storage) |
| Realtime | Convex subscriptions, `@convex-dev/presence` |
| Authentication | Better Auth with the `@convex-dev/better-auth` Convex adapter |
| Forms & Validation | `react-hook-form` + `@hookform/resolvers` + `zod` 4 |
| Package Manager | pnpm (workspace-configured via `pnpm-workspace.yaml`) |

## Project Structure

```
.
├── app/                        # Next.js App Router
│   ├── (shared-layout)/        # Route group sharing the navbar/footer layout
│   │   ├── page.tsx            # Landing page
│   │   ├── blog/               # Blog feed and [postId] detail page (+ loading.tsx)
│   │   └── create/             # Authenticated post creation page
│   ├── auth/                   # Login and sign-up pages (separate auth layout)
│   ├── api/auth/[...all]/      # Better Auth catch-all route handler
│   ├── schemas/                # Zod schemas (auth, blog, comments)
│   ├── actions.ts              # Server actions
│   ├── layout.tsx              # Root layout (fonts, theme, Convex provider, toaster)
│   └── globals.css             # Tailwind and global styles
├── components/
│   ├── ui/                     # Reusable UI primitives (button, card, input, toast, ...)
│   └── web/                    # Application-level components (navbar, hero, comments, presence, ...)
├── convex/                     # Convex backend
│   ├── schema.ts               # posts and comments tables + search indexes
│   ├── posts.ts                # Post queries/mutations
│   ├── comments.ts             # Comment queries/mutations
│   ├── presence.ts             # Presence tracking
│   ├── auth.ts / auth.config.ts # Better Auth integration
│   ├── http.ts                 # Convex HTTP routes
│   └── _generated/             # Generated Convex client types (do not edit)
├── lib/
│   ├── auth-client.ts          # Client-side Better Auth instance
│   ├── auth-server.ts          # Server-side auth helpers
│   └── utils.ts                # `cn` class-name utility
├── proxy.ts                    # Edge proxy: optimistic session-cookie guard for /blog and /create
├── features-sec.json           # Content for the landing-page features section
├── sampleData.jsonl            # Sample seed data
└── public/                     # Static assets (feature images, favicon)
```

## Data Model

The Convex schema (`convex/schema.ts`) defines:

- **posts** — `title`, `body`, `authorId`, optional `imageStorageId` (Convex storage file for the cover image). Full-text search indexes on `title` (`search_title`) and `body` (`search_body`).
- **comments** — `postId` (foreign key to posts), `authorId`, `authorName`, `body`.

## Getting Started

### Prerequisites

- Node.js 20 or newer
- pnpm (the project pins `packageManager: pnpm@11.24.0`)
- A Convex account (the free tier is sufficient)

### Installation

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Configure environment variables in `.env.local`:

   ```
   NEXT_PUBLIC_CONVEX_URL=<your convex deployment url>
   NEXT_PUBLIC_CONVEX_SITE_URL=<your convex site url>
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   BETTER_AUTH_URL=http://localhost:3000
   ```

   Running `npx convex dev` for the first time creates the deployment and populates the Convex variables automatically.

3. Push the schema and start the Convex backend in dev mode:

   ```bash
   npx convex dev
   ```

4. Start the Next.js development server:

   ```bash
   pnpm dev
   ```

   Open http://localhost:3000 in your browser.

### Available Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the Next.js dev server (Turbopack) |
| `pnpm build` | Create a production build |
| `pnpm start` | Serve the production build |
| `pnpm lint` | Run ESLint |
| `npx convex dev` | Sync the Convex backend (schema push and live functions) |

## Authentication Flow

- Better Auth runs in two places: a catch-all route handler at `/api/auth/[...all]` for HTTP, and a Convex-backed adapter (`convex/auth.ts`) for the database side.
- `proxy.ts` intercepts requests to `/blog` and `/create` and optimistically redirects users without a session cookie to `/auth/login`. This is a UX guard only; actual authorization is enforced at the page and query level, since a cookie alone does not prove a valid session.
- Convex functions verify the caller's identity through the Better Auth integration before returning protected data.

## Tradeoffs and Design Decisions

The key architectural choices in this project, with their advantages and disadvantages:

| Decision | Pros | Cons |
| --- | --- | --- |
| **Convex as database and backend** | Strongly typed end-to-end (schema types flow into the client); automatic realtime subscriptions with no websocket plumbing; built-in full-text search and file storage; zero servers to manage. | Vendor lock-in to Convex's runtime and pricing model; less flexible than raw SQL for complex joins and aggregations; relational modeling is manual (no enforced foreign-key constraints). |
| **Better Auth instead of NextAuth/Auth.js or a hosted provider such as Clerk** | First-class Convex adapter; identity data lives in your own database; fully self-hosted and customizable. | Smaller ecosystem than Auth.js; requires wiring both an HTTP route and a Convex integration; OAuth providers, rate limiting, and email verification must be configured manually. |
| **`proxy.ts` optimistic cookie guard** | Cheap edge-level redirect for unauthenticated visitors with zero database round-trips, so protected pages do not flash for logged-out users. | Explicitly not a security boundary: a forged cookie passes the check. Real authorization must (and does) happen in pages and Convex functions, which duplicates access logic in two layers. |
| **Next.js 16 with `cacheComponents` enabled** | Explicit cache boundaries (`use cache`) give predictable caching behavior and better default performance; aligns the project with the direction of the framework. | Newer, less documented API surface; caching mistakes are easier to make and harder to debug; community resources for Next 16 conventions are still sparse. |
| **App Router with a `(shared-layout)` route group** | Clean separation between the shared blog layout and the standalone auth layout without nested-route confusion; server components by default minimize client-side JavaScript. | Server/client component boundaries require discipline; data-fetching patterns differ from the Pages Router; some third-party libraries need the `"use client"` escape hatch. |
| **Tailwind CSS 4 + shadcn-style copied components** | Fast iteration, small runtime CSS, dark mode via class strategy; components are owned code that can be modified freely with no dependency-upgrade risk. | Component code is duplicated into the repo and maintained by hand; utility-heavy JSX reduces readability at a glance; Tailwind 4's config-less setup is a shift from v3 conventions. |
| **`react-hook-form` + zod for forms** | Uncontrolled forms with minimal re-renders; a single source of truth for validation shared between client and server. | Extra dependencies and boilerplate (resolvers, schema files) compared to plain controlled inputs for small forms. |
| **Presence via `@convex-dev/presence`** | Real-time indicator of who is reading a post with minimal custom code, leveraging Convex subscriptions. | Adds continuous heartbeat traffic; presence data is ephemeral and not useful offline; one more integration to maintain. |
| **pnpm with a workspace file** | Fast installs, strict dependency resolution (no phantom dependencies), and a pinned package manager for reproducible builds. | Behavior differs slightly from npm/yarn, which can confuse contributors; the workspace file is not currently used for real monorepo packages, adding minor config noise. |

## Notes and Limitations

- This is a portfolio/tutorial-grade application; there are no automated tests yet. Unit tests for Convex functions and end-to-end tests for the auth and posting flows are recommended before production use.
- Comments denormalize `authorName` into the comments table for cheap rendering; if users can change their display names, comments will need an update strategy.
- Only email/password authentication is configured; OAuth providers can be added through Better Auth's social provider configuration.
- Never commit real secrets; keep deployment-specific values in `.env.local`.


