# syntax = tonistiigi/dockerfile:runmount20181002
FROM node:13-alpine as compiler
RUN apk update
WORKDIR /app
COPY package.json package-lock.json tsconfig.json .babelrc ./
COPY src ./src

RUN npm ci
RUN npm run build
RUN FILENAME=$(npm pack) && echo $FILENAME > filename.txt

FROM node:13-alpine
WORKDIR /app
COPY --from=compiler /app ./tmp
COPY test/container .
RUN mv ./tmp/tsconfig.json .
RUN npm install ./tmp/$(cat ./tmp/filename.txt)
RUN rm -rf ./tmp
RUN npm install
CMD ["npm", "test"]
