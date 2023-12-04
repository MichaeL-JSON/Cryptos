FROM node:21-alpine3.17

WORKDIR /app

EXPOSE 5000

COPY package* ./

RUN npm install

RUN npm i -g @nestjs/cli

COPY . ./

RUN npm run build

CMD ["npm", "run", "start"]
