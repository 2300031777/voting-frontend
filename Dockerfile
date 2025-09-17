# Step 1: Build stage
FROM node:18 AS build-stage
WORKDIR /app

# Install git
RUN apt-get update && apt-get install -y git

# Clone your repo
RUN git clone https://github.com/2300031777/voting-frontend.git .

# Install dependencies and build Next.js app
RUN npm install
RUN npm run build

# Step 2: Runtime stage
FROM node:18 AS runtime
WORKDIR /app

# Copy built app from build-stage
COPY --from=build-stage /app ./

# Expose Next.js default port
EXPOSE 3000

# Start Next.js in production mode
CMD ["npm", "start"]
