FROM node:lts-alpine3.10
RUN mkdir -p /opt/bot
COPY ../HandBot /opt/bot
RUN cd /opt/bot \
    && npm install
WORKDIR /opt/bot
CMD ["node", "index.js"]