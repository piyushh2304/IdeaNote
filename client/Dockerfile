# Use official Node.js image as the build environment
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install

# Copy client source code and config files
COPY client ./client
COPY tailwind.config.ts ./
COPY postcss.config.js ./
COPY vite.config.ts ./
COPY index.html ./

# Build the client app
RUN pnpm run build:client

# Use a lightweight web server to serve the built files
FROM nginx:alpine

# Copy built files to nginx html directory
COPY --from=build /app/dist/spa /usr/share/nginx/html

# Expose port 80

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
