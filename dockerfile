FROM node:18.15.0

RUN mkdir /app
WORKDIR /app/src

ADD . .

RUN npm install
RUN npm run tailwind:build


EXPOSE 3030

CMD ["npm", "start"]