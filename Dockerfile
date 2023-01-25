# syntax=docker/dockerfile:1
FROM node:lts
# ARG NODE_VERSION="18.12.1"
# change with the Linux Alpine version of your choice
# ARG ALPINE_VERSION="3.17"
# FROM node:${NODE_VERSION}-alpine${ALPINE_VERSION} AS base
# install OpenSSL 1.1.x, needed for Linux Alpine 3.17+
# RUN apk update \ && apk add openssl1.1-compat
WORKDIR /final_1
COPY . .
RUN npm install
RUN npm run prisma:generate
# RUN npx prisma migrate 
COPY . .
CMD ["node", "./index.js"]
EXPOSE 3000