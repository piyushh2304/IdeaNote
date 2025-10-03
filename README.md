# IdeaNote

IdeaNote is a full-stack web application for collecting, managing, and voting on innovative ideas. Users can submit new ideas, browse existing ones, and vote on their favorites. The application features a modern, responsive frontend and a robust backend with persistent data storage.

## Tech Stack

### Frontend
- **Vue.js**: Progressive JavaScript framework for building user interfaces
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework for styling
- **TypeScript**: Typed superset of JavaScript

### Backend
- **Node.js**: JavaScript runtime for server-side development
- **Express.js**: Web application framework for Node.js
- **SQLite**: Lightweight, file-based relational database
- **TypeScript**: Typed superset of JavaScript

### DevOps & Tools
- **Docker**: Containerization platform
- **Docker Compose**: Tool for defining and running multi-container Docker applications
- **pnpm**: Fast, disk space efficient package manager

## Prerequisites

Before running this application, make sure you have the following installed:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd pixel-landing
   ```

2. Ensure Docker and Docker Compose are installed and running.

## Running the Application

1. Build and start the application using Docker Compose:
   ```bash
   docker-compose up --build
   ```

2. The application will be available at:
   - **Frontend**: http://localhost:3000
   - **Backend API**: http://localhost:8080

3. To stop the application, press `Ctrl+C` in the terminal or run:
   ```bash
   docker-compose down
   ```

## Features

- **Idea Submission**: Users can submit new ideas with descriptions
- **Idea Listing**: Browse all submitted ideas in chronological order
- **Voting System**: Upvote ideas to show support
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Updates**: Changes are reflected immediately
- **Persistent Storage**: Ideas and votes are stored in a SQLite database

## Scripts

The project includes several utility scripts located in the `scripts/` directory:

- `checkIdeas.ts`: Lists all ideas currently stored in the database
- `insertSeedIdeas.ts`: Inserts sample ideas into the database for testing

To run these scripts:

```bash
# Check ideas in the database
pnpm run check-ideas

# Insert seed ideas
pnpm run insert-seed
```

## Database

The application uses SQLite for data persistence. The database file is stored in a Docker volume (`sqlite-data`) to ensure data persists between container restarts.

- **Database Path**: `/app/data/ideas.sqlite` (inside the backend container)
- **Table**: `ideas` with columns: `id`, `text`, `votes`, `created_at`

## Development

For development without Docker:

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Start the development servers:
   ```bash
   # Frontend
   pnpm run dev:client

   # Backend
   pnpm run dev:server
   ```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
