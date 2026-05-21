# AI Support Ticket System

AI-powered support ticket backend built with Node.js, Express, TypeScript, Prisma, PostgreSQL, Socket.IO, and Docker.

## Features

- JWT Authentication
- Role-based Access Control
- Ticket Management
- AI Ticket Summaries
- Realtime Chat with Socket.IO
- File Uploads
- Swagger API Docs
- Global Error Handling
- Validation with Zod
- Docker Support

## Tech Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Prisma ORM
- Socket.IO
- Zod
- Multer
- Swagger
- Docker
- Groq/OpenAI

## Setup

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

## Docker Run

```bash
docker build -t ai-support-ticket-system .
docker run --env-file .env -p 3000:3000 ai-support-ticket-system
```

## API Docs

```txt
http://localhost:3000/api/docs
```