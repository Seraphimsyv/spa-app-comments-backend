FROM node:18.19.0

RUN npm install -g @nestjs/cli

WORKDIR /app

COPY project/package*.json ./

RUN npm install

RUN apt-get update && apt-get install -y postgresql postgresql-contrib

RUN apt-get install -y redis-server

COPY project/ /app

RUN service postgresql start \
  && su - postgres -c "psql -c 'CREATE DATABASE spa_comments;'"
  
EXPOSE 3000

CMD ["npm", "run", "start:dev"]