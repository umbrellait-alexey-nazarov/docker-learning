FROM node:14.17-alpine

RUN mkdir -p /usr/src/app/back-main
WORKDIR /usr/src/app/back-main

COPY package*.json /usr/src/app/back-main

RUN npm ci -q

COPY ./ /usr/src/app/back-main