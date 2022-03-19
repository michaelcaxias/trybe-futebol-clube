FROM node:16-alpine as backend

WORKDIR /backend

COPY package.json .

RUN npm install

COPY . .

CMD ["npm", "start"]

EXPOSE 3001