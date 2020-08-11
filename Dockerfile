FROM node:12

RUN mkdir /web
WORKDIR /web

COPY ./components /web/components
COPY ./pages /web/pages
COPY ./public /web/public
COPY ./utils /web/utils
COPY ./package.json /web/package.json
COPY ./package-lock.json /web/package-lock.json

CMD ls && npm i && tail -f /dev/null;

EXPOSE 3000