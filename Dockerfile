# ---------- Stage 1: Build Frontend ----------
FROM node:18-alpine AS frontend-build

# Set working directory for frontend
WORKDIR /app/frontend

# Copy frontend package files and install dependencies
COPY frontend/package*.json ./
RUN npm install

# Copy the rest of the frontend source code
COPY frontend/ .

# Build the frontend for production
RUN npm run build


# ---------- Stage 2: Setup Backend ----------
FROM node:18-alpine

# Set working directory for backend
WORKDIR /app/backend

# Copy backend package files and install dependencies
COPY backend/package*.json ./
RUN npm install --production

# Copy backend source code
COPY backend/ .

# Copy built frontend files into backend's public folder
COPY --from=frontend-build /app/frontend/dist ./public

# Expose backend port
EXPOSE 5000

# Environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Start the backend server
CMD ["node", "index.js"]
