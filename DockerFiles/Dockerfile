FROM node:14-slim
WORKDIR /home/opt/app
COPY . .
RUN npm install
EXPOSE 3000
CMD ["node", "../app.js"]
