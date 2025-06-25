# Use Node.js 18 Alpine for smaller image size
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Set environment variables
ENV NODE_ENV=production
ENV PORT=4321

# Expose port
EXPOSE 4321

# Start the application
CMD ["npm", "start"]
