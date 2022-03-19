FROM node:16-alpine as backend

WORKDIR /backend

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "start"]
