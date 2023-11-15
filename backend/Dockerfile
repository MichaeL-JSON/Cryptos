FROM node:21-alpine3.17

WORKDIR /app

EXPOSE 5000

COPY package* ./

RUN npm install

RUN npm install -g concurrently

COPY . ./

CMD ["concurrently", "npm:start:dev", "npm:mg:run" ]