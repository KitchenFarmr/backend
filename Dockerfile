FROM node:14.17-alpine as build

LABEL decription="Production image for KitchenFarmr."

WORKDIR /usr/src/app

SHELL ["/bin/ash", "-eo", "pipefail", "-c"]

RUN apk update && apk add --no-cache curl=7.67.0-r4 && curl -sf https://gobinaries.com/tj/node-prune | sh

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build && npm prune --production && node-prune

FROM gcr.io/distroless/nodejs:14

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/build ./build

HEALTHCHECK --interval=5m --timeout=5s --retries=2 \
    CMD curl -f http://localhost:5000/results/30030 || exit 1

CMD [ "build/app.js" ]