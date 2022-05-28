FROM node:lts-alpine

WORKDIR /home/node/app

COPY ../package*.json ./

COPY ../ .

ARG NODE_ENV

ENV NODE_ENV $NODE_ENV

RUN npm i \
  && npm i ts-node -g

RUN printf "npx prisma generate\nnpx prisma migrate dev --name 'init'\nnpm start\n" > entrypoint.sh

EXPOSE 8080

CMD ["/bin/sh", "entrypoint.sh"]