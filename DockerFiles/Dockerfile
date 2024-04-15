FROM node:14-slim as builder

# Update and install dependencies needed for the build
RUN apt-get update && \
    apt-get install -y bash && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /home/opt/app

COPY package*.json ./

# Install production dependencies and skip dev dependencies
RUN npm install --only=production

# Copy the rest of application code
COPY . .

# Stage 2: Setup the production environment
#FROM node:14-slim as production
FROM gcr.io/distroless/nodejs:14

# Copy the built node modules and binaries without the added packages
COPY --from=builder /home/opt/app /home/opt/app

WORKDIR /home/opt/app

EXPOSE 3000

CMD ["node", "app.js"]
