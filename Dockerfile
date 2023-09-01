# syntax=docker/dockerfile:1
FROM node:18-bullseye-slim as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build


FROM nginx:alpine
# RUN --mount=type=bind,source=/nginx.conf,target=/etc/nginx/nginx.conf:ro
# ENV SERVICE_URL http://localhost:8000
COPY /default.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist /etc/nginx/html