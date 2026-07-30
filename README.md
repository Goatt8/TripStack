# TripStack

TripStack is a travel-content guidebook publisher. Creators build region-based guidebooks from their travel records, and consumers choose trusted guides, customize the print layout, and create book-production orders.

## Target Users

- Creators: travel creators, YouTubers, and writers who want to package regional travel content as guidebooks.
- Consumers: travelers who want a trusted, printable guidebook instead of scattered posts and videos.

## Features

- Creator / Consumer entry flow
- Creator profile, follower count, trust score, and regional guidebook ranking
- Region filter for consumers
- Ranked guidebook discovery by print count and creator trust
- Guidebook content blocks for place-by-place flow management
- Layout customization before print order
- Order status flow: `pending -> processing -> completed`
- Seed data included, no login required

## Run With Docker

```bash
git clone <repo-url>
cd TripStack
cp .env.example .env
docker-compose up --build
```

Open:

```txt
http://localhost:3000
```

API:

```txt
http://localhost:4000/api
```

To change ports, edit `.env`:

```txt
WEB_PORT=3001
API_PORT=4001
```

## Completed Level

- Lv1: Travel guidebook content can be listed, filtered by region, and viewed through content blocks.
- Lv2: Consumers can create print orders with a selected layout and track order statuses.
- Lv3: The UI is designed around two users: creators who need profile/ranking feedback, and consumers who need trust signals before printing.

## UX Decisions

TripStack starts with role selection because creator and consumer goals are different. Creators care about profile credibility, regional ranking, and which guidebooks are consumed most. Consumers first choose a region, then compare guidebooks by ranking, print count, follower count, and trust score. Order statuses use plain language so users know whether a guidebook is just requested, being prepared, or completed.

## Tech Stack

- Frontend: Next.js, React, TypeScript
- Backend: Express, TypeScript
- DB: SQLite
- Runtime: Docker Compose

SQLite was selected for assignment stability. It allows reviewers to run the app with seed data immediately through Docker, while the API layer can later be moved to MySQL or PostgreSQL.


## AI Tool Usage

AI was used to brainstorm service scope, split the project into frontend/backend/database layers, draft seed data, and generate an initial Docker-based scaffold. The implementation was reviewed around the assignment requirements: independent execution, clear user flow, and explainable UI/UX decisions.
