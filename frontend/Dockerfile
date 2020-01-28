FROM node:12-buster

RUN npm install --global gatsby-cli

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY . .

EXPOSE 8000

CMD ["gatsby", "develop", "-H", "0.0.0.0"]
