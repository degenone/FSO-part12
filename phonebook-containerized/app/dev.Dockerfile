FROM node:20

COPY . .

RUN npm i

CMD [ "npm", "run", "dev" ]
