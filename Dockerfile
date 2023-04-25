FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 3000

RUN npm run build
CMD [ "node", "build/index.js" ]
