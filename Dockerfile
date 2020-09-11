FROM node:10

# Setting working directory. All the path will be relative to WORKDIR
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Installing dependencies
COPY . .
RUN npm install
RUN npm install -g serve

# Building app
RUN npm run export

EXPOSE 3000

# Running the app
CMD [ "serve","-l","3000", "out" ]