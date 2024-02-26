# SPA Comments app | Backend

This project is a NestJS application written in TypeScript. It leverages various technologies including PostgreSQL, Redis, queue, events, JWT authentication, and WebSockets.

## Features

- **PostgreSQL:** Utilizes PostgreSQL for database operations.
- **Redis:** Incorporates Redis for caching and session management.
- **Queue:** Implements a queue system for asynchronous tasks.
- **Events:** Utilizes event-based communication within the application.
- **JWT:** Provides JWT authentication for secure access.
- **WebSockets:** Implements real-time communication using WebSockets.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm or yarn
- Docker

### ⚠️ Warning:

Before running the project, ensure that ports 8000, 8010, and 8020 are available and not occupied by other applications or services. These ports are utilized for various project components, and their unavailability may lead to conflicts and hinder proper system operation. Please free up these ports prior to launching the project.

## Setup Instructions

1. **Clone the repository:**
    ```bash
    git clone <repository_url>

    cd <project-folder>/project
    ```
2. **Install dependencies:**
    ```bash
    npm install
    ```
3. **Start the development server:**
    ```bash
    npm run start:dev
    ```

### Docker initialization

1. Build docker image

```bash
docker-compose --build
```

3. Run docker

```bash
docker-compose up
```

## Project Structure

- `common/`: Contains common files and utilities.
  - `abstract.ts`: Abstract classes and functions.
  - `constant.ts`: Common constants used throughout the application.
  - `interfaces.ts`: Interfaces defining common data structures.
  - `regex.ts`: Regular expressions for data validation.
  - `types.ts`: Custom data types shared across modules.
  - `utils.ts`: Utility functions used across the project.
- `exceptions/`: Handles custom exceptions.
  - `query.exception.ts`: Exception handler for database query errors.
- `guards/`: Contains authentication and authorization guards.
  - `auth.guard.ts`: Authentication guard.
  - `jwt.guards.ts`: JWT authentication guard.
- `interceptors/`: Interceptors for request and response handling.
  - `password.interceptor.ts`: Interceptor for password hashing.
- `modules/`: Contains NestJS modules for organizing application features.
- `pipes/`: Custom pipes for request data validation.
  - `xssValidation.pipe.ts`: Cross-Site Scripting (XSS) validation pipe.

## Author

[Kiril Hohlov]