# syntax = tonistiigi/dockerfile:runmount20181002
# Dev Container
FROM node:alpine AS dev
RUN apk update && apk upgrade && apk add --no-cache bash openssh && apk add --no-cache git
RUN apk add --update libc6-compat
WORKDIR /build
ADD package.json ./package.json
ADD .npmrc ./.npmrc
RUN npm install
COPY . /build
EXPOSE 8000
VOLUME ["/build"]

# GatsbyJS/Server Build
FROM node:alpine AS compiler
ENV NODE_ENV=production
COPY --from=dev /build /build
WORKDIR /build
RUN npm run build
# RUN npm run build-server

# Final production container
FROM node:alpine
RUN apk update && apk upgrade && apk add --no-cache bash git openssh
COPY package.json .
COPY .npmrc .
# COPY --from=compiler /build/public /public
COPY --from=compiler /build/dist /dist
# COPY ./private ./private
COPY ./tsconfig.json .
RUN npm install --production
EXPOSE 80 443
CMD ["node", "-r", "esm", "/dist/index.js"]

