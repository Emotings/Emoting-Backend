FROM node:18-alpine

WORKDIR /app
ADD . /app/

RUN npm install
RUN npm run build

EXPOSE 8080
ENTRYPOINT npm run start