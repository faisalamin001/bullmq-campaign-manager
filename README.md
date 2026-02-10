# 📧 Email Campaign Manager (Redis + BullMQ)

A high-performance, modular email queueing system built with **Next.js**, **BullMQ**, and **Redis**. This project demonstrates professional architectural patterns for handling long-running background tasks in a modern web application.

---

## 🌟 Features

- **Real-time Dashboard**: Monitor job status (active, waiting, completed, failed) in real-time.
- **Modular Service Architecture**: Encapsulated queue logic in a dedicated `QueueService`.
- **Parallel Processing**: High-throughput worker capable of processing multiple jobs concurrently.
- **Resilient Design**: Exponential backoff and retry logic for failed jobs.
- **Premium UI**: Clean, responsive dashboard built with Tailwind CSS and Lucide icons.

## 🏗️ Project Structure

```text
├── app/                  # Next.js App Router (UI & API Routes)
├── components/           # Reusable UI Dashboard components
├── services/             # Business Logic (Queue management)
├── workers/              # Background Worker & Job Processors
├── lib/                  # Shared Connection Utilities (Redis/Queue)
├── types/                # Centralized TypeScript Interfaces
└── constants/            # Global Configuration & Magic Strings
```

---

## 🚀 Getting Started

### 1. Prerequisites

- **Node.js**: v18.x or later.
- **Redis Server**: You can use a local Redis instance or a managed service like [Upstash](https://upstash.com/) (recommended for easy setup).

### 2. Environment Setup

Create a `.env` file in the root directory and add your Redis URL:

```env
REDIS_URL=your_redis_connection_string
```

### 3. Installation

```bash
npm install
```

### 4. Running the Project

To run the full system, you need to start two processes in separate terminals:

#### Terminal 1: Background Worker

This process listens to the queue and "sends" the emails.

```bash
npm run worker
```

#### Terminal 2: Web Dashboard

This runs the Next.js frontend and the API routes for controlling the queue.

```bash
npm run dev
```

Visit **[http://localhost:3000](http://localhost:3000)** to view your dashboard.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Queue Engine**: BullMQ
- **Data Store**: Redis (via ioredis)
- **Styling**: Tailwind CSS
- **Types**: TypeScript
- **Icons**: Lucide React

---

_This project was built for learning purposes to explore message queue architectures and distributed systems._
