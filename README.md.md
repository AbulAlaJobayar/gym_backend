# Gym Class Scheduling and Membership Management System

A complete backend system for managing gym class scheduling, trainer assignments, and trainee bookings with robust authentication and business rule enforcement.

## Features

- **Role-Based Access Control**: Admin, Trainer, and Trainee roles
- **Class Management**: Schedule, update, and cancel classes with capacity limits
- **Booking System**: Trainee booking with conflict detection
- **Authentication**: JWT-based secure authentication
- **Validation**: Comprehensive input validation
- **Error Handling**: Custom error responses with proper status codes
- **Pagination & Filtering**: Efficient data retrieval
- **Database Management**: Prisma ORM with PostgreSQL

## Tech Stack

### Backend

- **Runtime**: Node.js (v18+)
- **Framework**: Express.js
- **Language**: TypeScript
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Authentication**: JWT
- **Linting**: ESLint + Prettier
- **Documentation**: POSTMAN ([postman](https://documenter.getpostman.com/view/20207336/2sB2j98UUr))

### Infrastructure

- **Hosting**Vercel

## Prerequisites

- Node.js (v18+)
- PostgreSQL (v12+)
- yarn (v1.22+)
- Git

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/gym-management-system.git
   cd gym-management-system
   ```
2. **Install dependencies:**:
   ```
   yarn install
   ```
3. **Set up environment variables:**:
   ```
   .env.example .env
   ```
   Edit .env with your configuration:
   ```
   DATABASE_URL="postgresql://user:password@localhost:5432/gym-management?schema=public"
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRES_IN=1d
   PORT=5000
   NODE_ENV=development
   ```
4. **Database setup:**

   ```
   npx prisma migrate dev
   npx prisma generate
   ```

   **Development mode:**

```
yarn run dev
```

**Contact**
Abul Ala Jobayar - abulalajobayar@gmail.com

Project Link: https://github.com/yourusername/gym-management-system
