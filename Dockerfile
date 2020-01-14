# syntax = tonistiigi/dockerfile:runmount20181002
FROM node:alpine as compiler
RUN apk update
WORKDIR /app
COPY package.json package-lock.json tsconfig.json .babelrc .npmrc ./
COPY src ./src

RUN npm ci
RUN npm run build
RUN FILENAME=$(npm pack) && echo $FILENAME > filename.txt

FROM node:alpine 
WORKDIR /app
COPY --from=compiler /app ./tmp
COPY test/container .
RUN npm install ./tmp/$(cat ./tmp/filename.txt)
CMD ["node", "index.js"]
