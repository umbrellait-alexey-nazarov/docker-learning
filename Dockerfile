FROM node:14

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package*.json /usr/src/app/

RUN npm ci -q

COPY ./dist /usr/src/app/dist

EXPOSE 8080

CMD ["npm", "start"]