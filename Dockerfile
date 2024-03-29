FROM node:alpine

WORKDIR /app
COPY package.json .

RUN apk --no-cache add --virtual builds-deps build-base python3
RUN npm install

COPY . .

CMD ["npm", "start"]