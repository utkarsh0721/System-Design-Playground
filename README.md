<div align="center"><br />
System Design Playground AI
Generate, visualize, compare, save, and study production-scale software architectures
Built to learn how real systems evolve from product requirements to secure, scalable architecture decisions

<br /><a href="https://react.dev"> <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React 18" /> </a> <a href="https://vite.dev"> <img src="https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite 6" /> </a> <a href="https://nodejs.org"> <img src="https://img.shields.io/badge/Node.js-20+-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js 20+" /> </a> <a href="https://expressjs.com"> <img src="https://img.shields.io/badge/Express-4-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express 4" /> </a> <a href="https://www.mongodb.com"> <img src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB and Mongoose" /> </a> <a href="https://reactflow.dev"> <img src="https://img.shields.io/badge/React_Flow-Interactive-FF0072?style=for-the-badge&logo=react&logoColor=white" alt="React Flow" /> </a> <a href="https://ai.google.dev"> <img src="https://img.shields.io/badge/AI-Gemini_%7C_OpenAI-8B5CF6?style=for-the-badge&logo=google-gemini&logoColor=white" alt="Gemini and OpenAI" /> </a> <a href="LICENSE"> <img src="https://img.shields.io/badge/License-MIT-FACC15?style=for-the-badge" alt="MIT License" /> </a> <a href="CONTRIBUTING.md"> <img src="https://img.shields.io/badge/PRs-Welcome-brightgreen?style=for-the-badge" alt="Pull Requests Welcome" /> </a> <a href="https://github.com/utkarsh0721/System-Design-Playground-AI/releases"> <img src="https://img.shields.io/badge/Version-1.0.0-2563EB?style=for-the-badge" alt="Version 1.0.0" /> </a><br /> <br />
What It Is •
Why I Built It •
Architecture •
Request Flow •
Quick Start •
API Reference •
Tech Decisions •
Contributing

<br />
<a href="https://github.com/utkarsh0721/System-Design-Playground-AI"><strong>View Repository</strong></a>
·
<a href="https://github.com/utkarsh0721/System-Design-Playground-AI/issues">Report a Bug</a>
·
<a href="https://github.com/utkarsh0721/System-Design-Playground-AI/issues">Request a Feature</a>

</div>
What is System Design Playground AI
System Design Playground AI is a full-stack developer platform that converts product requirements into structured, production-oriented system architectures.

A developer chooses a system, expected user scale, traffic profile, architecture style, and product features. The platform then generates a complete architecture report and an interactive infrastructure diagram that can be explored, edited, saved, shared, and exported.

This is not a chatbot interface. AI output is treated as structured application data and rendered as:

Functional and non-functional requirements
Database and schema recommendations
REST API contracts
Service boundaries and responsibilities
Authentication and authorization flow
Caching, load balancing, and scaling strategies
Redis, Kafka, CDN, storage, sharding, and replication plans
Security, rate limiting, monitoring, and logging decisions
Estimated infrastructure cost
Trade-offs, bottlenecks, and future improvements
Draggable React Flow nodes and validated edges
The same platform also includes system comparisons, a 13-topic learning center, quizzes, activity tracking, public sharing, and multi-format export.

[!NOTE]
Gemini and OpenAI are optional. When no API key is configured—or a provider times out or returns malformed data—the backend automatically uses a deterministic fallback architecture engine.

Why I Built This
Most system design resources explain isolated terms: Redis is a cache, Kafka is a message broker, a CDN serves content near users, and sharding splits data. What they often do not show is how these decisions connect inside one complete architecture.

I built System Design Playground AI to answer practical questions by turning them into an interactive product:

How does a product requirement become a technical architecture? The generator converts scale, traffic, and features into structured system decisions.
Why would one system use PostgreSQL while another uses MongoDB or Elasticsearch? The generated report connects each data store to an access pattern and trade-off.
What happens when an AI response is incomplete or invalid? The backend parses, bounds, normalizes, validates, and safely falls back instead of trusting model output.
How can a user understand an architecture instead of only viewing it? Every infrastructure node opens an educational panel with advantages, disadvantages, alternatives, and real-world usage.
How do you make generated work reusable? Designs are persisted, searchable, editable, shareable, and exportable as PDF, PNG, JSON, and Markdown.
How do you protect user-owned architecture data? Every private operation is scoped to the authenticated user, with JWT verification and server-side token revocation.
The project goes beyond CRUD by combining AI orchestration, untrusted-response normalization, interactive visualization, authentication, ownership controls, education, testing, and export workflows in one application.

Project Highlights
Area	Scope
Architecture output	25+ structured report sections
Interactive diagram	Custom nodes, edges, minimap, zoom, pan, drag, saved positions
Learning center	13 system design modules
Assessment	3 difficulties with MCQ, scenario, and architecture questions
Export	PDF, PNG, JSON, and Markdown
AI providers	Gemini, OpenAI, and deterministic fallback
Security	JWT, bcrypt, token revocation, ownership checks, Helmet, CORS, rate limits
Persistence	Users, designs, quiz attempts, and activity history
Quality gate	Node tests, ESLint, production build, and dependency audits
Architecture
mermaid

flowchart LR
    User[Developer] -->|Interacts| Web[React + Vite Frontend]
    Web -->|REST + JWT| API[Express API]

    API --> Auth[Authentication and Validation]
    Auth --> Services[Domain Services]

    Services --> DB[(MongoDB)]
    Services --> AI{AI Service}

    AI --> Gemini[Gemini API]
    AI --> OpenAI[OpenAI API]
    AI --> Fallback[Fallback Engine]

    AI --> Normalizer[JSON Parser and Diagram Normalizer]
    Normalizer --> Services

    API -->|Structured JSON| Web
    Web --> Canvas[React Flow Canvas]
    Web --> Reports[Architecture Report]
    Web --> Exports[PDF / PNG / JSON / Markdown]
Backend responsibility flow
text

┌──────────────────────────────────────────────────────────────────────┐
│                              CLIENT                                  │
│        React pages · Forms · Axios · JWT · React Flow canvas         │
└───────────────────────────────┬──────────────────────────────────────┘
                                │ HTTPS / JSON
                                ▼
┌──────────────────────────────────────────────────────────────────────┐
│                          EXPRESS API                                 │
│  Helmet · CORS · Compression · Body limits · Global rate limiting   │
└───────────────────────────────┬──────────────────────────────────────┘
                                │
                                ▼
┌──────────────────────────────────────────────────────────────────────┐
│                         ROUTE MIDDLEWARE                             │
│       JWT authentication · Validation · AI/Auth rate limits          │
└───────────────────────────────┬──────────────────────────────────────┘
                                │
                                ▼
┌──────────────────────────────────────────────────────────────────────┐
│                    CONTROLLERS AND SERVICES                         │
│  Auth · Users · Designs · Compare · Learning · Quiz · Activity      │
└───────────────┬─────────────────────────────┬────────────────────────┘
                │                             │
                ▼                             ▼
┌───────────────────────────────┐   ┌──────────────────────────────────┐
│            MONGODB            │   │          AI ORCHESTRATION        │
│ Users · Designs · Quiz · Logs │   │ Gemini · OpenAI · Fallback      │
│ Mongoose schemas and indexes  │   │ Parse · Normalize · Validate     │
└───────────────────────────────┘   └──────────────────────────────────┘
Why the backend is layered
text

Route
  └── Middleware
        ├── Authentication
        ├── Validation
        └── Rate limiting
              └── Controller
                    └── Service
                          ├── Mongoose model
                          ├── AI provider
                          └── Activity service
Routes define endpoints and middleware order.
Middleware protects and validates requests before business logic runs.
Controllers translate HTTP input and output.
Services own application rules and provider orchestration.
Models define database structure and indexes.
Prompts define reusable AI instructions and JSON contracts.
Utilities handle JWTs, validation, responses, fallback data, and seeding.
How Architecture Generation Works
text

1.  User opens /app/new and selects a system, scale, traffic, and features

2.  React stores the form values in component state

3.  User clicks Generate Architecture

4.  Axios sends POST /api/v1/designs/generate with the JWT bearer token

5.  Express applies security headers, CORS, body limits, and rate limiting

6.  Authentication middleware verifies JWT signature, expiry, type, and version

7.  Validation middleware checks supported scale, traffic, architecture, and features

8.  Design controller passes req.user.id and req.body to the design service

9.  Design service checks the user, AI credits, and sanitizes all input

10. Architecture prompt defines every required JSON section and diagram contract

11. AI service selects Gemini or OpenAI from environment configuration

12. Provider receives the prompt with a 40-second timeout and JSON response request

13. Backend removes accidental Markdown fences and parses the JSON

14. Missing report sections are merged with safe fallback content

15. Diagram normalizer sanitizes IDs, bounds node count, and validates edge endpoints

16. Mongoose saves input, report, nodes, edges, tags, owner, and timestamps

17. User AI credits are reduced and a generation activity is recorded

18. Express responds 201 Created with the complete saved design

19. React navigates to /app/designs/:designId

20. React Flow renders the diagram and the report renders structured sections

21. User can drag nodes, save positions, rename, favourite, duplicate, share, or export
Why AI output is never trusted directly
AI providers may return invalid JSON, Markdown wrappers, missing fields, duplicate node IDs, nonexistent edge targets, or too many nodes. The AI service therefore:

Removes Markdown code fences
Parses JSON inside a guarded try/catch
Merges missing sections with deterministic fallback data
Limits diagrams to 24 nodes and 40 edges
Sanitizes labels, IDs, descriptions, and detail keys
Guarantees unique node IDs
Removes edges whose source or target does not exist
Returns a complete fallback report if provider processing fails
Features
AI architecture generation
Requirement-driven prompt generation
Gemini and OpenAI provider adapters
Complete offline fallback engine
Structured report instead of chat messages
Realistic technology and cost recommendations
Safe response parsing and normalization
Interactive architecture workspace
React Flow architecture canvas
Custom client, CDN, gateway, service, cache, queue, database, storage, and observability nodes
Drag, zoom, pan, fit view, and minimap
Animated labeled connections
Persistent node positions in MongoDB
Technology explanation drawer
Node intelligence
Detailed engineering briefs for:

text

Redis · Kafka · RabbitMQ · MongoDB · PostgreSQL · Elasticsearch
CDN · Nginx · API Gateway · Docker · Kubernetes
Each brief includes what the technology is, why it is used, advantages, disadvantages, alternatives, and companies using it.

Design lifecycle
text

Generate → Save → Search → Open → Edit → Favourite → Duplicate → Share → Export
User-scoped private designs
Search and favourite filters
Rename and node-position updates
Deep duplication as a private copy
Unlisted public share links
Recent generation, view, comparison, lesson, and quiz activity
Learning and assessment
13 complete system design lessons
Animated mental models
Advantages, disadvantages, and examples
Interview questions and answers
Easy, Medium, and Hard quiz modes
MCQ, scenario, and architecture-identification questions
Server-side grading and leaderboard
Multi-format export
Format	Implementation	Result
PDF	jsPDF + optional diagram capture	Paginated architecture report
PNG	html-to-image at 2× pixel ratio	High-resolution diagram
JSON	Versioned serialized design	Portable structured data
Markdown	Custom report formatter	Documentation-ready file
Export libraries are loaded with dynamic import() only when requested.

Quick Start
Prerequisites
Bash

node --version    # v20.0.0 or newer
npm --version     # v10.0.0 or newer
git --version     # any recent version
You also need one of the following:

Local MongoDB installation
MongoDB Atlas connection string
Gemini and OpenAI keys are optional.

Clone and run
Bash

# 1. Clone the repository
git clone https://github.com/utkarsh0721/System-Design-Playground-AI.git
cd System-Design-Playground-AI

# 2. Install the root runner and both independent applications
npm install
npm run install:all

# 3. Create environment files
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# 4. Update backend/.env with MongoDB and a secure JWT secret

# 5. Run frontend and backend together
npm run dev
Open:

text

Frontend:     http://localhost:5173
Backend:      http://localhost:5000
Health check: http://localhost:5000/api/v1/health
Verify the API
Bash

curl http://localhost:5000/api/v1/health
Expected response:

JSON

{
  "success": true,
  "message": "System Design Playground API is healthy",
  "data": {
    "uptime": 42.5,
    "timestamp": "2026-07-16T10:00:00.000Z"
  }
}
Seed demo content
Bash

npm run seed --prefix backend
text

Email:    demo@systemdesign.ai
Password: Demo1234!
The seed is idempotent and creates a demo user, favourite architecture, and quiz attempt.

Project Structure
text

System-Design-Playground/
│
├── frontend/
│   ├── public/
│   │   └── favicon.svg
│   │
│   ├── src/
│   │   ├── api/
│   │   │   ├── client.js               # Axios instance + JWT/401 interceptors
│   │   │   ├── authApi.js              # Register, login, profile, logout
│   │   │   ├── designApi.js            # Generate and manage designs
│   │   │   ├── compareApi.js           # AI system comparisons
│   │   │   ├── learningApi.js          # Topic catalog and lessons
│   │   │   ├── quizApi.js              # Quiz, grading, attempts, leaderboard
│   │   │   └── activityApi.js          # Recent user activity
│   │   │
│   │   ├── components/
│   │   │   ├── common/                 # Buttons, skeletons, errors, empty states
│   │   │   ├── design/                 # Form, cards, report accordions
│   │   │   ├── diagram/                # React Flow canvas, nodes, detail panel
│   │   │   ├── export/                 # PDF/PNG/JSON/Markdown menu
│   │   │   └── navigation/             # Sidebar, mobile nav, command palette
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx         # Session restore and auth state
│   │   │
│   │   ├── hooks/
│   │   │   ├── useAsync.js
│   │   │   └── useDebounce.js
│   │   │
│   │   ├── layouts/
│   │   │   ├── PublicLayout.jsx
│   │   │   └── AppLayout.jsx
│   │   │
│   │   ├── pages/                      # Landing, dashboard, generator, quiz, etc.
│   │   ├── routes/                     # Browser router and protected route
│   │   ├── styles/                     # Tailwind and React Flow styling
│   │   └── utils/                      # Constants, exporters, node details
│   │
│   ├── .env.example
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── backend/
│   ├── config/
│   │   ├── db.js                       # MongoDB lifecycle
│   │   └── env.js                      # Central environment config
│   │
│   ├── controllers/                    # Thin HTTP handlers
│   ├── middleware/
│   │   ├── auth.js                     # JWT and token-version verification
│   │   ├── validate.js                 # Reusable request validation
│   │   ├── errorHandler.js             # Global normalized errors
│   │   └── notFound.js                 # Unknown route handling
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Design.js
│   │   ├── QuizAttempt.js
│   │   └── Activity.js
│   │
│   ├── prompts/
│   │   ├── architecturePrompt.js
│   │   ├── comparePrompt.js
│   │   ├── learningPrompt.js
│   │   └── quizPrompt.js
│   │
│   ├── routes/                         # Auth, users, designs, learning, quiz
│   ├── services/                       # Business logic and AI orchestration
│   ├── tests/
│   │   └── core.test.js                # Node test suite
│   ├── utils/                          # JWT, validators, fallback, seed
│   ├── .env.example
│   ├── app.js                          # Express middleware and route mounting
│   ├── server.js                       # Database connection and HTTP lifecycle
│   └── package.json
│
├── .gitignore
├── CONTRIBUTING.md
├── LICENSE
├── README.md
├── TESTING.md
└── package.json
API Reference
Base URL:

text

/api/v1
Protected routes require:

http

Authorization: Bearer <access-token>
Authentication — /api/v1/auth
Authentication routes are rate limited to reduce brute-force attempts.

Method	Endpoint	Auth	Status	Description
POST	/auth/register	No	201	Create user and return JWT
POST	/auth/login	No	200	Verify credentials and return JWT
GET	/auth/me	Bearer	200	Restore current authenticated user
POST	/auth/logout	Bearer	200	Increment token version and revoke sessions
Register request:

JSON

{
  "name": "Ada Lovelace",
  "email": "ada@example.com",
  "password": "Design123"
}
Successful response:

JSON

{
  "success": true,
  "message": "Account created",
  "data": {
    "user": {
      "id": "67f...",
      "name": "Ada Lovelace",
      "email": "ada@example.com",
      "aiCredits": 100
    },
    "token": "eyJhbGciOi..."
  }
}
Designs — /api/v1/designs
Method	Endpoint	Auth	Status	Description
POST	/designs/generate	Bearer	201	Generate and persist architecture
POST	/designs	Bearer	201	Save/import structured design
GET	/designs	Bearer	200	Search and paginate user designs
GET	/designs/:id	Owner	200	Get full report and diagram
PATCH	/designs/:id	Owner	200	Rename, tag, favourite, or save nodes
DELETE	/designs/:id	Owner	200	Delete private design
POST	/designs/:id/duplicate	Owner	201	Create private unfavourited copy
PATCH	/designs/:id/favourite	Owner	200	Toggle or set favourite status
POST	/designs/:id/share	Owner	200	Enable or disable unlisted sharing
GET	/designs/shared/:shareId	No	200	View unlisted shared architecture
Generate architecture request:

JSON

{
  "systemName": "Instagram",
  "expectedUsers": "10 Million",
  "traffic": "High",
  "architectureType": "Microservices",
  "features": [
    "Authentication",
    "Media Upload",
    "Search",
    "Recommendation System",
    "Likes",
    "Follow"
  ],
  "customRequirements": "Target p95 read latency below 200ms"
}
Response shape:

JSON

{
  "success": true,
  "message": "Architecture generated",
  "data": {
    "design": {
      "_id": "67f...",
      "name": "Instagram",
      "input": {},
      "report": {
        "functionalRequirements": [],
        "nonFunctionalRequirements": [],
        "databaseDesign": [],
        "apiEndpoints": [],
        "scalingStrategy": [],
        "security": []
      },
      "diagram": {
        "nodes": [],
        "edges": []
      }
    },
    "generation": {
      "provider": "gemini",
      "fallbackReason": null
    }
  }
}
List query parameters:

Parameter	Default	Maximum	Description
page	1	—	Page number
limit	12	50	Designs per page
search	—	—	Case-insensitive name search
favourite	—	—	Use true for favourites only
sort	updated	—	updated, name, or viewed
Comparison — /api/v1/compare
Method	Endpoint	Auth	Status	Description
POST	/compare	Bearer	200	Generate structured system comparison
JSON

{
  "systemA": "Instagram",
  "systemB": "TikTok",
  "focus": "global media architecture"
}
Learning — /api/v1/learning
Method	Endpoint	Auth	Status	Description
GET	/learning	Bearer	200	List 13 learning topics
GET	/learning/:slug	Bearer	200	Get lesson and interview questions
Quizzes — /api/v1/quizzes
Method	Endpoint	Auth	Status	Description
GET	/quizzes	Bearer	200	Get questions without answer keys
POST	/quizzes/submit	Bearer	201	Grade answers on server
GET	/quizzes/leaderboard	Bearer	200	Get ranked attempts
GET	/quizzes/attempts	Bearer	200	Get current user history
Activity — /api/v1/activity
Method	Endpoint	Auth	Status	Description
GET	/activity	Bearer	200	Get filtered recent activity
POST	/activity	Bearer	201	Record activity
DELETE	/activity	Bearer	200	Clear user activity history
Tech Stack — Engineering Decisions
Layer	Technology	Why this choice
Language	JavaScript	Shared language across browser and server
UI	React 18	Component composition and state-driven rendering
Build tool	Vite	Fast development server and optimized production build
Styling	Tailwind CSS	Consistent responsive design without duplicated CSS
Routing	React Router	Nested layouts, lazy pages, and protected routes
API client	Axios	Central base URL, JWT interceptor, and 401 handling
Motion	Framer Motion	Route transitions and polished interaction feedback
Diagram	React Flow	Draggable architecture nodes, edges, controls, and minimap
API runtime	Node.js 20+	Native fetch, async I/O, and shared JavaScript ecosystem
API framework	Express	Small, explicit middleware and MVC routing model
Database	MongoDB	Flexible storage for evolving AI-generated report structures
ODM	Mongoose	Validation, indexes, relationships, and query modeling
Authentication	JWT	Stateless signed access tokens for REST requests
Password security	bcrypt	Adaptive one-way hashing with cost factor 12
AI	Gemini + OpenAI	Provider flexibility and model-independent application flow
AI resilience	Fallback engine	Keeps generation usable without keys or during outages
Security	Helmet + CORS	Secure headers and explicit browser origin policy
Abuse prevention	express-rate-limit	Global plus stricter auth and AI limits
PNG export	html-to-image	Captures mounted React Flow canvas in browser
PDF export	jsPDF	Client-side paginated report generation
Testing	Node test runner	Dependency-free backend unit tests
Environment Variables
Copy the examples before running:

Bash

cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
Backend — backend/.env
env

# Runtime
NODE_ENV=development
PORT=5000

# MongoDB
MONGODB_URI=mongodb://127.0.0.1:27017/system_design_playground

# Comma-separated browser origins
CLIENT_URL=http://localhost:5173

# Authentication
JWT_SECRET=replace_with_at_least_64_random_characters
JWT_EXPIRES_IN=7d

# AI provider: gemini or openai
AI_PROVIDER=gemini

GEMINI_API_KEY=
GEMINI_MODEL=gemini-2.0-flash

OPENAI_API_KEY=
OPENAI_MODEL=gpt-4o-mini
Generate a secure JWT secret:

Bash

node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
Frontend — frontend/.env
env

# Vite proxies /api to the backend during local development
VITE_API_URL=/api/v1

# UI-only route review; API pages still require the backend
VITE_DEMO_MODE=false
[!IMPORTANT]
Never place JWT_SECRET, MONGODB_URI, GEMINI_API_KEY, or OPENAI_API_KEY in the frontend environment file. Every VITE_ variable may be exposed to the browser bundle.

Database Models
text

users
├── name
├── email (unique index)
├── password (bcrypt hash, hidden by default)
├── role
├── profile and preferences
├── aiCredits
├── tokenVersion
└── timestamps


designs
├── owner → users._id
├── name and slug
├── input
│   ├── systemName
│   ├── expectedUsers
│   ├── traffic
│   ├── architectureType
│   └── features
├── report (structured AI output)
├── diagram
│   ├── nodes
│   └── edges
├── tags
├── isFavourite
├── visibility
├── shareId (sparse unique index)
├── lastViewedAt
└── timestamps


quizattempts
├── user → users._id
├── difficulty
├── answers
├── score
├── total
├── durationSeconds
└── timestamps


activities
├── user → users._id
├── type
├── design → designs._id
├── label
├── metadata
└── timestamps
Important indexes
Unique user email
Designs by owner and update time
Text/search support for design names and tags
Favourite designs by owner
Sparse unique share ID
Activity by user and creation time
Quiz attempts by score and creation time
Security
Risk	Protection
Plain-text password exposure	bcrypt hashing with cost factor 12
Unauthorized API access	JWT signature, issuer, expiry, type, and user verification
Token reuse after logout	Database token version increments on logout
IDOR between users	Design queries always include authenticated owner ID
Brute-force authentication	Dedicated auth rate limiter
AI endpoint abuse	Dedicated generation and comparison limits plus AI credits
Cross-origin misuse	Explicit CLIENT_URL CORS allowlist
Unsafe response headers	Helmet security middleware
Oversized payloads	2 MB JSON and URL-encoded body limits
NoSQL/search injection	Allow-listed fields, validation, and escaped search input
AI-generated broken diagrams	Node sanitization and edge endpoint validation
AI-generated HTML/XSS	Output rendered as React text, not injected HTML
Secret exposure	AI and JWT secrets remain in backend environment only
Public private-design access	Only unlisted designs with random share IDs are public
Export Pipeline
JSON and Markdown
text

Loaded design data
      │
      ├── JSON.stringify → Blob → Object URL → Browser download
      │
      └── Markdown formatter → Blob → Object URL → Browser download
PNG
text

Mounted React Flow element
      │
      ▼
Dynamic import: html-to-image
      │
      ▼
2× pixel ratio capture
      │
      ▼
Omit minimap and canvas controls
      │
      ▼
Download .png
PDF
text

Design report + optional diagram
      │
      ▼
Dynamic import: jsPDF + html-to-image
      │
      ▼
Dark branded cover + wrapped report sections
      │
      ▼
Automatic page breaks
      │
      ▼
Download .pdf
Running Tests
Bash

# Complete repository quality gate
npm test

# Backend unit tests only
npm test --prefix backend

# Frontend lint only
npm run lint --prefix frontend

# Frontend production build only
npm run build --prefix frontend

# Audit both independent packages
npm run audit:all
Current backend suite:

text

5 tests
├── Fallback completeness + diagram edge validity
├── Comparison identity
├── Request validators
├── Learning topic completeness
└── Quiz answer-key protection
See TESTING.md for API smoke tests, authentication cases, lifecycle checks, responsive widths, accessibility checks, export verification, and recommended future test expansion.

Available Scripts
Bash

npm run dev                    # Run API and frontend together
npm run install:all            # Install backend and frontend dependencies
npm run build                  # Build frontend for production
npm test                       # Backend tests + frontend lint + build
npm run audit:all              # Audit both application packages

npm run dev --prefix backend   # Run Express with nodemon
npm start --prefix backend     # Run backend without nodemon
npm run seed --prefix backend  # Create demo content
npm test --prefix backend      # Run Node unit tests

npm run dev --prefix frontend  # Run Vite development server
npm run lint --prefix frontend # Run ESLint with zero warnings
npm run build --prefix frontend # Create frontend/dist
npm run preview --prefix frontend
Deployment
A common deployment topology:

text

Vercel / Netlify / Cloudflare Pages
                 │
                 │ HTTPS
                 ▼
       Render / Railway / VPS
                 │
                 ├── MongoDB Atlas
                 ├── Gemini API
                 └── OpenAI API
Frontend
Bash

npm run build --prefix frontend
Output:

text

frontend/dist
For split frontend and backend domains:

env

VITE_API_URL=https://your-api-domain.com/api/v1
Configure the host to send unknown frontend routes to index.html so React Router pages survive browser refresh.

Backend
Bash

npm start --prefix backend
Required production values:

env

NODE_ENV=production
MONGODB_URI=your_mongodb_atlas_uri
CLIENT_URL=https://your-frontend-domain.com
JWT_SECRET=your_unique_high_entropy_secret
AI_PROVIDER=gemini
GEMINI_API_KEY=your_key
Production checklist
 Use TLS for browser and API traffic
 Store all secrets in the host's secret manager
 Set the exact frontend origin in CLIENT_URL
 Use a MongoDB replica set with backups
 Configure AI usage and billing alerts
 Add centralized logs and uptime monitoring
 Verify frontend SPA rewrite rules
 Run npm test and npm run audit:all
 Never commit .env files

Roadmap
 Collaborative architecture editing
 Architecture version history and diffing
 JSON design import
 AWS, Azure, and GCP-specific node libraries
 Cloud-provider cost calculators
 Comments and architecture review threads
 User-created learning paths
 Email verification and password reset
 Multi-factor authentication
 Refresh-token families and per-device sessions
 End-to-end browser test suite
 Visual regression and load testing
Contributing
System Design Playground AI is open to bug fixes, tests, documentation improvements, learning topics, architecture templates, and new infrastructure-node explanations.

Getting started
Bash

# Fork the repository on GitHub, then clone your fork
git clone https://github.com/<utkarsh0721>/System-Design-Playground-AI.git
cd System-Design-Playground-AI

# Create a branch from main
git checkout -b feature/your-feature-name

# Install and verify the project
npm install
npm run install:all
npm test

# Commit using a clear Conventional Commit message
git commit -m "feat(diagram): add Cassandra node intelligence"

# Push and open a pull request
git push origin feature/your-feature-name
Commit format
text

type(scope): short description

Types:  feat | fix | docs | refactor | test | perf | chore
Scopes: auth | designs | ai | diagram | compare | learning | quiz | export | api | ui | docs

Examples:
feat(ai): add provider retry budget
fix(designs): preserve node positions during rename
test(quiz): verify answer keys are never returned
docs(readme): add deployment architecture
perf(ui): lazy load export dependencies
Pull request checklist
 npm test passes
 npm run audit:all reports no unresolved vulnerabilities
 New behavior includes validation and error handling
 .env.example is updated for new environment variables
 No secrets or real .env files are committed
 Documentation is updated where behavior changed
 UI changes work on mobile and desktop
Read the complete guide in CONTRIBUTING.md.

License
MIT — see LICENSE for details.

You may use, copy, modify, distribute, and build on this project as long as the copyright notice and license are preserved.

<div align="center">
👨‍💻 Author
Utkarsh Sharma

LinkedIn: www.linkedin.com/in/utkarsh-sharma-prob-solv
GitHub: https://github.com/utkarsh0721
Email: utkarshsharma0721@gmail.com

If this project helped you learn something, consider starring the repository ⭐

</div>
