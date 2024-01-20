FROM node:20 as base

WORKDIR /usr/src/app

ENV REACT_APP_BACKEND_URL=http://localhost:3000/

FROM base as test

COPY . .

RUN npm ci

RUN CI=true npm run test

FROM base as build

COPY --from=test /usr/src/app /usr/src/app

RUN npm run build

FROM nginx:1.20-alpine

COPY --from=build /usr/src/app/build /usr/share/nginx/html
