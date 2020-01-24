# base image where node is installed
FROM node:lts-alpine3.10

RUN mkdir -p /opt/HandBot

COPY ../HandBot /opt/HandBot

RUN cd /opt/HandBot \
    && npm install

WORKDIR /opt/HandBot

CMD ["node", "index.js"]
