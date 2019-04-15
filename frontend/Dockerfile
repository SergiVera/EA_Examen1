FROM node

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install

RUN npm install -g @angular/cli

EXPOSE 4200

CMD ["ng", "serve"]
