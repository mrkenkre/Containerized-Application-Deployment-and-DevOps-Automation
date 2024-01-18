FROM node:14-slim
RUN apt-get update && \
    apt-get install -y bash && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
WORKDIR /home/opt/app
COPY . .
RUN npm install
EXPOSE 3000
CMD ["node", "app.js"]