FROM node:14.17-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json /usr/src/app/

RUN npm ci -q

COPY ./dist /usr/src/app/dist