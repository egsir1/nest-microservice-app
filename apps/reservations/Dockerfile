# Development Stage
FROM node:alpine AS development

WORKDIR /usr/src/app

# Copy package files
COPY package.json ./
COPY pnpm-lock.yaml ./

# Install pnpm globally
RUN npm install -g pnpm

# Install all dependencies
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN pnpm run build

# Production Stage
FROM node:alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

# Copy package files
COPY package.json ./
COPY pnpm-lock.yaml ./

# Install pnpm and production dependencies
RUN npm install -g pnpm
RUN pnpm install --prod

# Copy the build artifacts from the development stage
COPY --from=development /usr/src/app/dist ./dist

# Start the application
CMD ["node", "dist/apps/reservations/main"]
