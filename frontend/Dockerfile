FROM node:12-buster

RUN npm install --global gatsby-cli && gatsby telemetry --disable

WORKDIR /app

COPY package*.json /app/

RUN npm ci

COPY . .

EXPOSE 8000

CMD ["npm", "run", "develop"]
