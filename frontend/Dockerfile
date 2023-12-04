FROM node:21-alpine3.17 as BUILD_IMAGE
WORKDIR /app/vite-build
COPY package* ./
RUN npm install
COPY . ./
RUN npm run build

FROM nginx as PRODUCTION
COPY --from=BUILD_IMAGE /app/vite-build/dist/ /usr/share/nginx/html
COPY ./nginx/conf/nginx.conf/ /etc/nginx/conf.d/
EXPOSE 80
