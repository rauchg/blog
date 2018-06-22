FROM mhart/alpine-node:10 as base
RUN yarn global add pkg
WORKDIR /usr/src
COPY package.json yarn.lock /usr/src/
RUN yarn
COPY . .
RUN pkg -t node10 . -o bin
RUN ls

FROM alpine
RUN apk add --no-cache libstdc++ libgcc
COPY --from=base /usr/src/bin /start
EXPOSE 3000
CMD ["/start"]
