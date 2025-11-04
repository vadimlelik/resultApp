FROM node:20 AS builder
WORKDIR /app
COPY ./client ./client
RUN cd client && npm ci && npm run build

FROM node:20
WORKDIR /app/server
COPY ./server/package*.json ./
RUN  npm ci --omit=dev
COPY ./server ./

# copy build client files
COPY --from=builder /app/client/build ./dist
EXPOSE 3005
CMD [ "node", "index.js" ]