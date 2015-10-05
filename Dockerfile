FROM node:latest
EXPOSE 8080
EXPOSE 80
RUN npm install -g gulp mocha pm2
RUN mkdir /app
WORKDIR /app