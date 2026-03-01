# Blogster

A full-stack blog platform built with Node.js, React, and MongoDB. Features Google OAuth authentication, Redis-backed query caching, AWS S3 image uploads, and end-to-end Puppeteer tests with a CI pipeline via GitHub Actions.

---

## Features

- **Google OAuth 2.0** — sign in with your Google account via Passport.js
- **Create & view blogs** — multi-step form with title, content, and optional image upload
- **AWS S3 image uploads** — presigned URL flow; images are stored directly in S3 from the browser
- **Redis query caching** — blog list queries are cached per user and invalidated on new posts
- **Protected routes** — all blog API endpoints require authentication
- **End-to-end tests** — Puppeteer test suite covering auth flow, form validation, and blog creation
- **CI/CD** — GitHub Actions pipeline runs tests on every push to `main`

---

## Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| Node.js / Express | HTTP server and API |
| MongoDB / Mongoose | Primary database |
| Redis | Query result caching |
| Passport.js (Google OAuth 2.0) | Authentication |
| AWS SDK (S3) | Presigned URL generation for image uploads |
| cookie-session | Session management |

### Frontend
| Technology | Purpose |
|---|---|
| React 16 | UI library |
| Redux + redux-thunk | State management |
| redux-form | Multi-step form handling |
| React Router v4 | Client-side routing |
| Tailwind CSS v3 | Styling |
| Axios | HTTP client |

### Testing & CI
| Technology | Purpose |
|---|---|
| Jest 29 | Test runner |
| Puppeteer | Headless browser E2E tests |
| GitHub Actions | CI pipeline (test on push/PR to `main`) |

---

## Project Structure

```
node-blog/
├── index.js                  # Express app entry point
├── routes/
│   ├── authRoutes.js         # Google OAuth routes
│   ├── blogRoutes.js         # Blog CRUD API
│   └── uploadRoutes.js       # S3 presigned URL endpoint
├── models/
│   ├── Blog.js               # Blog schema (title, content, imageKey, _user)
│   └── User.js               # User schema (googleId)
├── middlewares/
│   ├── requireLogin.js       # Auth guard middleware
│   └── cleanCache.js         # Cache invalidation middleware
├── services/
│   └── cache.js              # Redis caching layer for Mongoose
├── config/
│   ├── keys.js               # Config loader (picks dev/ci/prod)
│   ├── ci.js                 # CI config (uses environment variables)
│   └── prod.js               # Production config (uses environment variables)
├── tests/
│   ├── header.test.js        # Header / auth flow E2E tests
│   ├── blogs.test.js         # Blog creation E2E tests
│   ├── setup.js              # Jest global setup
│   └── helpers/
│       ├── page.js           # Puppeteer page wrapper
│       └── factories/        # Test data factories
├── client/                   # React frontend (CRA v5)
│   ├── src/
│   │   ├── components/
│   │   │   ├── App.js
│   │   │   ├── Header.js
│   │   │   ├── Landing.js
│   │   │   ├── Dashboard.js
│   │   │   └── blogs/
│   │   │       ├── BlogList.js
│   │   │       ├── BlogForm.js
│   │   │       ├── BlogField.js
│   │   │       ├── BlogFormReview.js
│   │   │       └── BlogShow.js
│   │   ├── actions/          # Redux action creators
│   │   ├── reducers/         # Redux reducers
│   │   ├── index.js          # React entry point
│   │   ├── index.css         # Tailwind directives
│   │   └── setupProxy.js     # Dev proxy to Express (port 4000)
│   ├── tailwind.config.js
│   └── public/
│       └── index.html
└── .github/
    └── workflows/
        └── deploy.yaml       # GitHub Actions CI
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB running locally on port `27017`
- Redis running locally on port `6379`
- A Google OAuth 2.0 application ([console.cloud.google.com](https://console.cloud.google.com))
- An AWS S3 bucket with appropriate CORS and IAM permissions

### 1. Clone the repository

```bash
git clone https://github.com/mohamedzeina/node-blog.git
cd node-blog
```

### 2. Configure environment

Create `config/dev.js` (this file is git-ignored):

```js
module.exports = {
  googleClientID: 'YOUR_GOOGLE_CLIENT_ID',
  googleClientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
  mongoURI: 'mongodb+srv://<username>:<password>@<cluster>.mongodb.net/advNode_blog',
  cookieKey: 'some-random-secret-string',
  redisUrl: 'redis://127.0.0.1:6379',
  accessKeyId: 'YOUR_AWS_ACCESS_KEY_ID',
  secretAccessKey: 'YOUR_AWS_SECRET_ACCESS_KEY',
};
```

### 3. Install dependencies

```bash
npm install --legacy-peer-deps
```

### 4. Run in development

```bash
npm run dev
```

This starts both the Express server (port `4000`) and the React dev server (port `3000`) concurrently. Open [http://localhost:3000](http://localhost:3000).

---

## Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Run Express + React dev servers concurrently |
| `npm run server` | Run Express server only (nodemon) |
| `npm run client` | Run React dev server only |
| `npm run build` | Build the React client for production |
| `npm test` | Run the Jest / Puppeteer test suite |
| `npm start` | Start Express in production mode |

---

## API Reference

All routes under `/api` require authentication. Unauthenticated requests return `401 { error: 'You must log in!' }`.

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/auth/google` | Initiate Google OAuth flow |
| `GET` | `/auth/google/callback` | OAuth callback |
| `GET` | `/auth/logout` | Log out and clear session |
| `GET` | `/api/current_user` | Return currently authenticated user |
| `GET` | `/api/blogs` | List all blogs for the current user (cached) |
| `GET` | `/api/blogs/:id` | Get a single blog by ID |
| `POST` | `/api/blogs` | Create a new blog post |
| `GET` | `/api/upload` | Get a presigned S3 URL for image upload |

---

## Testing

Tests use Puppeteer to drive a headless Chromium browser against a live server.

```bash
# Make sure MongoDB and Redis are running, then:
npm test
```

The test suite covers:

- Header text and Google OAuth redirect
- Login / logout flow
- Blog creation form validation
- Submitting a blog and verifying it appears in the index
- Unauthenticated access to protected API endpoints

### CI

GitHub Actions runs the full test suite on every push and pull request to `main`. The workflow spins up MongoDB and Redis as Docker services and injects Google OAuth credentials from repository secrets (`GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`).

---

## Environment Variables (CI / Production)

| Variable | Description |
|---|---|
| `NODE_ENV` | `ci` or `production` |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `MONGO_URI` | MongoDB connection string |
| `REDIS_URL` | Redis connection string |
| `COOKIE_KEY` | Secret key for cookie-session |
| `ACCESS_KEY_ID` | AWS access key ID |
| `SECRET_ACCESS_KEY` | AWS secret access key |

