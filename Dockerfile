FROM node:slim

WORKDIR /app

# Copy our package.json
COPY package.json ./

RUN npm install
RUN npm i -g ts-node


COPY . .


CMD ["npm", "start"]