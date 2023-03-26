FROM node:18.15.0

RUN mkdir /app
WORKDIR /app

ADD . .

RUN npm
RUN npm tailwind:build


EXPOSE 3030

CMD ["npm", "start"]