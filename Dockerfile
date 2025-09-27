from node:22 as build

WORKDIR /build

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install

COPY src src/
COPY public public/
COPY app.config.js app.config.js
COPY jsconfig.json jsconfig.json
RUN npm run build


from nginx:1.29.1-alpine3.22-slim as final
expose 8080

workdir /usr/share/nginx/wwwroot
copy --from=build /build/.output/public .
copy nginx.conf /etc/nginx/nginx.conf
