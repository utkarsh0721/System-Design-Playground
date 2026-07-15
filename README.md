```markdown
# 🚀 System Design Playground AI

**AI-powered platform to generate, visualize, compare, and learn production-scale system architectures.**

<p align="center">
  <a href="CONTRIBUTING.md"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT" /></a>
</p>

## 📖 Overview

System Design Playground AI is a full-stack web application that helps developers learn how to design large-scale distributed systems using artificial intelligence. It **generates complete software architectures** (including requirements analysis, databases, APIs, security, scaling, and cost estimation) powered by AI (Google Gemini / OpenAI) instead of relying on unstructured chat output. The app provides an **interactive drag-and-drop architecture canvas** (built with React Flow) where users can visualize and refine designs. It also includes a Compare mode (compare two real systems), Quiz mode (knowledge quizzes), and Design Management (save, load, and export designs).

## 🎥 Demo & Screenshots

<p align="center">
<img src="docs/banner.png" width="100%" alt="System Design Playground AI Banner" />
</p>

*Add screenshots in `docs/screenshots/` and a demo GIF in `docs/demo.gif`.*

- ![Demo GIF](docs/demo.gif)
- ![Landing Page](docs/screenshots/landing.png)
- ![Dashboard](docs/screenshots/dashboard.png)
- ![Architecture Canvas](docs/screenshots/canvas.png)
- ![Compare Mode](docs/screenshots/compare.png)
- ![Learning Center](docs/screenshots/learning.png)
- ![Quiz Mode](docs/screenshots/quiz.png)

## 📑 Table of Contents

- [Overview](#overview)
- [Demo & Screenshots](#demo--screenshots)
- [Features](#features)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [API Endpoints](#api-endpoints)
- [Authentication & Security](#authentication--security)
- [Export & Testing](#export--testing)
- [Deployment](#deployment)
- [Project Stats](#project-stats)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)
- [Markdown Tips](#markdown-tips)

## ✨ Features

- **AI-Powered Architecture Generation:** Generate full architecture designs with one click. The AI engine (Gemini/OpenAI) produces detailed reports including requirements, database schemas, APIs, microservices, security, scaling, caching, monitoring, and cost analysis.
- **Interactive Architecture Canvas:** Refine and organize your design on a React Flow canvas (drag-and-drop nodes, zoom/pan, minimap). Click nodes to learn about chosen technologies.
- **Learning Center:** Explore system design topics (e.g., Redis, Kafka, CAP Theorem, sharding, replication, CDNs, API gateways, load balancing, queues, caching).
- **Compare Systems:** Compare architectures of real-world systems side by side (e.g., Instagram vs. TikTok, Netflix vs. YouTube).
- **Quiz Mode:** Test your knowledge with quizzes (Easy/Medium/Hard) featuring MCQs and scenario questions. Track scores on a leaderboard.
- **Design Management:** Save, rename, favorite, duplicate, delete, and share your architecture designs. Search and organize projects in your dashboard.
- **Export Options:** Export designs and reports to PDF, PNG, JSON, or Markdown for documentation.
- **User Accounts & Authentication:** JWT-based user login/registration, password reset, and profile management.
- **Responsive UI:** Built with React, Vite, and Tailwind CSS for a fast, mobile-friendly interface.

## 🏗️ Architecture

High-level flowchart of the system architecture:

```mermaid
flowchart LR
    U[User / Developer] -->|Interacts with UI| F[Frontend (React + Vite)]
    F -->|API calls| B[Backend (Express.js)]
    B -->|AI queries| AI[Gemini / OpenAI API]
    B -->|Database| DB[(MongoDB Atlas)]
    B -->|Auth| Auth([JWT Auth])
```

Component diagram using subgraphs:

```mermaid
flowchart TB
    subgraph Frontend
      UI[React + Vite (UI)]
    end
    subgraph Backend
      API[Express.js Server]
      AI[Gemini/OpenAI Engine]
      DB[(MongoDB Atlas)]
      JWT[JWT Auth Service]
    end
    UI --> API
    API --> AI
    API --> DB
    API --> JWT
```

## 📂 Project Structure

```text
System-Design-Playground-AI/
├── frontend/         # React & Vite frontend app
├── backend/          # Node.js/Express backend API
├── docs/             # Documentation, images (banner, screenshots)
├── README.md         # Project README
├── LICENSE           # MIT License
└── .gitignore        # Ignored files
```

<details>
<summary>Detailed Structure</summary>

```text
System-Design-Playground-AI/
├── frontend/
│   ├── public/             # Static assets (favicon, index.html, etc.)
│   ├── src/
│   │   ├── api/            # Axios API calls
│   │   ├── assets/         # Images, logos, etc.
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # React context providers
│   │   ├── hooks/          # Custom React hooks
│   │   ├── layouts/        # Page layouts
│   │   ├── pages/          # React pages (Dashboard, Login, etc.)
│   │   ├── routes/         # React Router routes
│   │   ├── styles/         # Global CSS (Tailwind)
│   │   └── utils/          # Helper functions
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── config/            # Config (DB URI, JWT secret)
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Express middleware (auth, error handling)
│   ├── models/            # Mongoose models (User, Design, Quiz, etc.)
│   ├── prompts/           # AI prompt templates
│   ├── routes/            # Express routes
│   ├── services/          # Business logic
│   ├── utils/             # Utility functions
│   ├── app.js             # Express app setup
│   ├── server.js          # Server startup
│   └── package.json
├── docs/
│   ├── banner.png         # Project banner image
│   ├── demo.gif           # Demo animation
│   └── screenshots/       # UI screenshots
│       ├── landing.png
│       ├── dashboard.png
│       ├── canvas.png
│       ├── compare.png
│       ├── learning.png
│       └── quiz.png
├── LICENSE                # MIT License
└── .gitignore             # Git ignore file
```
</details>

## 🛠️ Tech Stack

- ![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=%2361DAFB)
- ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
- ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=000)
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat-square&logo=tailwind-css&logoColor=fff)
- ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=fff)
- ![Express](https://img.shields.io/badge/Express.js-404d59?style=flat-square&logo=express&logoColor=fff)
- ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat-square&logo=mongodb&logoColor=fff)
- ![React Flow](https://img.shields.io/badge/React_Flow-007ACC?style=flat-square&logo=reactflow&logoColor=fff)
- ![Axios](https://img.shields.io/badge/Axios-007ACC?style=flat-square&logo=axios&logoColor=fff)
- ![Framer Motion](https://img.shields.io/badge/Framer_Motion-FF0055?style=flat-square&logo=framer&logoColor=fff)
- ![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat-square&logo=github)
- ![MongoDB Atlas](https://img.shields.io/badge/MongoDB_Atlas-47A248?style=flat-square&logo=atlas&logoColor=fff)
- ![Render](https://img.shields.io/badge/Render-FF344B?style=flat-square&logo=render&logoColor=fff)
- ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=fff)
- ![JSON Web Token](https://img.shields.io/badge/JWT-323330?style=flat-square&logo=jsonwebtokens)

## ⚙️ Installation

1. **Clone the repository:**  
   ```bash
   git clone https://github.com/utkarsh0721/System-Design-Playground-AI.git
   cd System-Design-Playground-AI
   ```
2. **Install dependencies:**  
   - **Frontend:** `cd frontend && npm install`  
   - **Backend:** `cd backend && npm install`
3. **Set up environment variables:** See [Environment Variables](#environment-variables).
4. **Run the project (in development):**  
   - **Frontend:** inside `frontend/`, run `npm run dev` (default: http://localhost:3000)  
   - **Backend:** inside `backend/`, run `npm run dev` (default: http://localhost:5000)

## 🔑 Environment Variables

Create a `.env` file inside the `backend/` directory with the following keys:

```env
PORT=5000
MONGODB_URI=<Your MongoDB connection string>
JWT_SECRET=<Your JWT secret key>
CLIENT_URL=http://localhost:3000
GEMINI_API_KEY=<Your Google Gemini API key>
OPENAI_API_KEY=<Your OpenAI API key>
```

- **PORT:** Backend port (default 5000).  
- **MONGODB_URI:** MongoDB Atlas connection string.  
- **JWT_SECRET:** Secret for signing JSON Web Tokens.  
- **CLIENT_URL:** Frontend app URL (for CORS).  
- **GEMINI_API_KEY, OPENAI_API_KEY:** API keys for the AI services.

Make sure `.env` is added to `.gitignore` to keep secrets safe.

## ▶️ Running the Project

- **Frontend:** In `frontend/`, run:
  ```bash
  npm run dev
  ```
  (Open [http://localhost:3000](http://localhost:3000) in your browser)
- **Backend:** In `backend/`, run:
  ```bash
  npm run dev
  ```
  (Backend API runs at [http://localhost:5000](http://localhost:5000))

## 📡 API Endpoints

**Authentication & Users:**  
- `POST /api/v1/auth/register` – Register a new user.  
- `POST /api/v1/auth/login` – User login (returns JWT token).  
- `GET /api/v1/users/me` – Get current user profile (requires JWT).

**Architecture Generation:**  
- `POST /api/v1/architectures` – Generate a new architecture.  
  _Request (JSON):_  
  ```json
  {
    "description": "Design a scalable video streaming platform with user accounts and chat."
  }
  ```  
  _Response (JSON):_  
  ```json
  {
    "success": true,
    "architecture": { /* generated structure */ },
    "analysis": "The system should use microservices ...",
    "diagramUrl": "...",
    "id": "abc123"
  }
  ```  
- `GET /api/v1/architectures/:id` – Retrieve a generated architecture by ID.

**Saved Designs (CRUD):**  
- `GET /api/v1/designs` – List all saved designs for the user.  
- `POST /api/v1/designs` – Save a new design.  
- `GET /api/v1/designs/:id` – Get a specific design.  
- `PUT /api/v1/designs/:id` – Update a design.  
- `DELETE /api/v1/designs/:id` – Delete a design.

**Learning Content:**  
- `GET /api/v1/learning/topics` – List all learning topics.  
- `GET /api/v1/learning/:topicId` – Get content for a specific topic (e.g., "cap-theorem").

**Quiz:**  
- `GET /api/v1/quiz?difficulty=easy` – Get quiz questions by difficulty.  
- `POST /api/v1/quiz/submit` – Submit answers and get a score.

**Compare:**  
- `GET /api/v1/compare?system1=Instagram&system2=TikTok` – Compare two systems by name and get analysis.

## 🔒 Authentication & Security

- **JWT Tokens:** Protected endpoints require a valid JSON Web Token in the `Authorization: Bearer <token>` header.  
- **Password Hashing:** User passwords are hashed using bcrypt before saving. Do **not** store plaintext passwords.  
- **Environment Security:** Keep secrets in `.env` (excluded by `.gitignore`). The JWT secret and DB URI are never exposed.  
- **Middleware:** Auth middleware checks tokens on protected routes. CORS is configured to allow only the frontend origin.  
- **Validation:** All inputs are validated server-side to avoid malformed requests or injections.

## 📤 Export & 🧪 Testing

- **Export:** Architectures and reports can be exported from the UI as **PDF, PNG, JSON, or Markdown**.  
- **Testing:**  
  - **Backend:** Run unit/integration tests (if implemented) with `npm test` in `backend/`.  
  - **Frontend:** Run UI tests (if implemented) with `npm test` in `frontend/`.  
  - You can use Jest, Mocha, React Testing Library, Cypress, etc., for testing components and endpoints.

## 🚀 Deployment

| Platform        | Type                    | Free Tier / Notes                  |
|-----------------|-------------------------|------------------------------------|
| **Vercel**      | Frontend (React app)    | Free plan, auto-deploy from GitHub |
| **Netlify**     | Frontend (React app)    | Free plan, built-in CI/CD          |
| **Render**      | Backend (Node.js API)   | Free tier, pull from GitHub        |
| **Heroku**      | Backend (Node.js API)   | Free (hobby dyno); easy setup     |
| **MongoDB Atlas** | Database              | Free M0 cluster, easy scaling      |

**CI/CD Options:**  
- **GitHub Actions:** Integrated with GitHub, free for public repos; easy YAML workflows.  
- **Travis CI / CircleCI:** Free for open-source, supports Node.js.  
- **Jenkins:** Self-hosted, open-source, highly customizable (requires own server).

## 📊 Project Stats

- **Full-stack:** React + Vite (frontend), Node.js + Express + MongoDB (backend).  
- **AI Models:** Integrates Google Gemini and OpenAI APIs.  
- **Security:** JWT authentication with bcrypt hashing.  
- **Scalability:** MongoDB Atlas for cloud DB, stateless backend services.  
- **Learning:** 10+ system design topics covered.  
- **Quiz:** 3 difficulty levels, 50+ questions.  
- **UI:** Interactive React Flow diagram editor.

## 🤝 Contributing

Contributions are welcome! Please fork the repository, make improvements, and open a pull request. For major changes, open an issue first to discuss.

- Read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.  
- A [Pull Request template](.github/PULL_REQUEST_TEMPLATE.md) is provided.  
- Follow the existing code style and include tests for new features.

## 📜 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

```text
MIT License

Copyright (c) 2026 Utkarsh Sharma

Permission is hereby granted, free of charge, to any person obtaining a copy...
... (remaining MIT license text) ...
```

## 👨‍💻 Author

Utkarsh Sharma — [@utkarsh0721](https://github.com/utkarsh0721)  
LinkedIn: [utkarsh-sharma-prob-solv](https://www.linkedin.com/in/utkarsh-sharma-prob-solv/)  
Email: utkarshsharma0721@gmail.com

## 📝 Markdown Tips

- Use triple backticks (```) with a language (e.g., `bash`, `json`, `mermaid`) to create fenced code blocks with syntax highlighting.
- Prefix headings with `#` (e.g., `#`, `##`, `###`). Missing a `#` will not render as a header.
- Wrap Mermaid diagrams in ```mermaid ... ``` to render flowcharts on GitHub.
- For lists, leave a blank line before the list and indent sub-lists properly.
- Provide alt text for images and use relative paths (e.g., `docs/image.png`) so images appear on GitHub.
- Ensure `.gitignore` excludes `node_modules/`, `.env`, and build files to avoid committing them.
```
