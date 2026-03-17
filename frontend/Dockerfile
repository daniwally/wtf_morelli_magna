# Build stage
FROM node:20-alpine as build

WORKDIR /app

# Copy package files
COPY package.json yarn.lock* ./

# Install dependencies
RUN yarn install --frozen-lockfile --network-timeout 100000 || yarn install --network-timeout 100000

# Copy source code
COPY . .

# Build the app
RUN yarn build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Install serve
RUN npm install -g serve

# Copy built files
COPY --from=build /app/build ./build

# Expose port
EXPOSE 3000

# Start server
CMD ["serve", "-s", "build", "-l", "3000"]
