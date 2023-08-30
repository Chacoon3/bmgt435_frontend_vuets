# syntax=docker/dockerfile:1
FROM node:18-bullseye-slim as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build


FROM nginx:alpine
RUN --mount=type=bind,source=/nginx.conf,target=/etc/nginx/nginx.conf:ro
COPY --from=build /app/dist /usr/share/nginx/html
ENV BMGT435_SERVICE='localhost:8000'
EXPOSE 80