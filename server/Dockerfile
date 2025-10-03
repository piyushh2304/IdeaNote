# Use official Node.js image
FROM node:20-alpine

WORKDIR /app

# Copy package files and install dependencies
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install

# Copy server source code
COPY server ./server
COPY shared ./shared
COPY vite.config.server.ts ./

# Build the server
RUN pnpm run build:server

# Expose port 8080
EXPOSE 8080

# Start the server
CMD ["pnpm", "run", "start"]
