# syntax=docker/dockerfile:1
FROM node:18-bullseye-slim as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build


FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html