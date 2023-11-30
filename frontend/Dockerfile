FROM node:21-alpine3.17 as BUILD_IMAGE
WORKDIR /app/vite-build
COPY package* ./
RUN npm install
COPY . ./
RUN npm run build

FROM node:21-alpine3.17 as PRODUCTION
WORKDIR /app/vite-prod
COPY --from=BUILD_IMAGE /app/vite-build/dist/ /app/vite-prod/dist/
EXPOSE 8080
COPY package.json .
COPY vite.config.js .
COPY postcss.config.js .
COPY tailwind.config.js .
RUN npm i typescript
CMD ["npm", "run", "preview"]
