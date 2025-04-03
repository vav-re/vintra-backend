# Dockerfile
FROM node:18-alpine

WORKDIR /app
COPY dist/ /app

RUN npm install -g serve

CMD ["serve", "-s", ".", "-l", "8080"]
