FROM node:latest

WORKDIR /my-app
ARG NODE_ENV=production
COPY package*.json /my-app/
RUN npm install
COPY src /my-app/src

CMD ["npm", "run", "server"]