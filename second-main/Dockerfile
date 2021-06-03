FROM node:14.17-alpine

RUN mkdir -p /usr/src/app/second-main
WORKDIR /usr/src/app/second-main

COPY package*.json /usr/src/app/second-main

RUN npm ci -q

COPY ./ /usr/src/app/second-main