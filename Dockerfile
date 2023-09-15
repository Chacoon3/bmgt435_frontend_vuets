# syntax=docker/dockerfile:1
FROM node:18-bullseye-slim as build
ENV VITE_BMGT435_SERVICE http://localhost:8000/
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build


FROM nginx:alpine
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /etc/nginx/html
EXPOSE 80
