FROM ubuntu

MAINTAINER n10324321

#update
ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get update

#Install npm
RUN apt-get install npm -y

#Install nodemon
RUN npm i nodemon -g

#create app directory
COPY . /app
WORKDIR /app

# Install dependencies
RUN npm i

#Expose port
EXPOSE 3001

#start
CMD ["npm", "start"]