FROM ubuntu

#update
ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get update

#Install npm
RUN apt-get install npm -y

#Install pm2
RUN npm i nodemon -g

#create app directory
COPY . /app
WORKDIR /app

# Copy app source
COPY . /src

#create src directory
WORKDIR /src

#install app dependencies
RUN npm i

#Export port to outside world
EXPOSE 3001

CMD ["npm", "start"]