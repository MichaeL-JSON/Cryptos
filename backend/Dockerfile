FROM node:18-alpine3.18

WORKDIR /app

EXPOSE 5000

COPY package* ./

RUN npm install

COPY . ./

CMD ["/bin/sh", "entrypoint.sh"]