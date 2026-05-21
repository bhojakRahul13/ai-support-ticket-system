# AI Support Ticket System

AI-powered support ticket backend built with Node.js, Express, TypeScript, Prisma, PostgreSQL, Socket.IO, Docker, and AI integration.

---

## Live API

https://ai-support-ticket-system-n18e.onrender.com

---

## Swagger Documentation

https://ai-support-ticket-system-n18e.onrender.com/api/docs

---

## Features

- JWT Authentication
- Role-based Access Control
- AI Ticket Summary
- Realtime Chat with Socket.IO
- File Uploads
- Swagger API Docs
- Dockerized Backend
- Cloud Deployment
- Health Monitoring API

---

## Tech Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Prisma ORM
- Zod
- Socket.IO
- Swagger
- Docker
- Render
- Groq/OpenAI

---

## Run Locally

```bash
npm install
npm run dev
```

---

## Docker Run

```bash
docker build -t ai-support-ticket-system .
docker run --env-file .env -p 3000:3000 ai-support-ticket-system
```

---

## Health API

```txt
GET /api/health
```