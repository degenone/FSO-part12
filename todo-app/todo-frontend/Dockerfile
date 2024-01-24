FROM node:20 as base

WORKDIR /usr/src/app

ENV REACT_APP_BACKEND_URL=http://localhost:8080/api/

FROM base as test

COPY . .

RUN npm ci

RUN CI=true npm run test

FROM base as build

COPY --from=test /usr/src/app /usr/src/app

RUN npm run build

RUN npm install -g serve

EXPOSE 3001

CMD ["serve", "build", "-l", "3001"]
