FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Set build-time argument and env
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

# Install dependencies based on environment
RUN if [ "$NODE_ENV" = "production" ]; then \
      npm ci --only=production ; \
    else \
      npm install ; \
    fi

# Copy environment variables 
COPY .env .env

# Copy source code
COPY src/ ./src/

# Create non-root user
RUN addgroup -g 1001 -S nodejs && adduser -S nodejs -u 1001 -G nodejs

# Set permissions
RUN chown -R nodejs:nodejs /app
USER nodejs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# Start the application
CMD ["npm", "start"]
