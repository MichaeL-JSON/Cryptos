FROM node:18-alpine3.18

WORKDIR /app

EXPOSE 5000

COPY package* ./

RUN npm install

RUN npm install -g concurrently

COPY . ./

CMD ["concurrently", "npm:mg:run", "npm:dev"]