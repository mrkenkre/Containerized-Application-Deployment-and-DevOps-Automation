# Stage 1: Build and install dependencies
FROM node:14-slim as builder

# Update and install dependencies needed for the build
RUN apt-get update && \
    apt-get install -y bash && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /home/opt/app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install production dependencies and skip dev dependencies
RUN npm install --only=production

# Copy the rest of your application code
COPY . .

# Build the application if needed
# RUN npm run build (Uncomment this if you have a build script)

# Stage 2: Setup the production environment
FROM node:14-slim as production

# Copy the built node modules and binaries without the added packages
COPY --from=builder /home/opt/app /home/opt/app

# Set working directory
WORKDIR /home/opt/app

# Expose port 3000 for the application
EXPOSE 3000

# Command to run the application
CMD ["node", "app.js"]
