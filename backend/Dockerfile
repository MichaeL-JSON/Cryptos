FROM node:21-alpine3.17

WORKDIR /app

EXPOSE 5000

COPY package* ./

RUN npm install

RUN npm install -g concurrently

RUN npm i -g @nestjs/cli

COPY . ./

CMD ["concurrently", "npm:start:dev", "npm:mg:run" ]