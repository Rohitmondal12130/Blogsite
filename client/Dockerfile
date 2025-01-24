FROM node:20.17.0

WORKDIR /app

COPY . .

RUN npm install -g http-server

EXPOSE 3000

CMD [ "npm", "start"]