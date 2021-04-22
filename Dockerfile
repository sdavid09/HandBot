# base image where node is installed
FROM node:latest

RUN mkdir -p /opt/HandBot

COPY . /opt/HandBot

RUN cd /opt/HandBot \
    && npm install

WORKDIR /opt/HandBot

CMD ["node", "index.js"]
