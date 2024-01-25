FROM node:20 as base

WORKDIR /usr/src/app

FROM base as build

ENV VITE_SERVER_URL=http://localhost:3001/api/persons

COPY ./app .

RUN npm ci

RUN npm run build

FROM base as server

COPY ./server .

COPY --from=build /usr/src/app/dist /usr/src/app/dist

RUN npm ci --omit=dev

CMD [ "npm", "start" ]
