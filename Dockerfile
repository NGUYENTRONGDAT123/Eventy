FROM ubuntu

MAINTAINER n10324321

#update
ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get update

#Install npm
RUN apt-get install npm -y

#Install pm2
RUN npm i pm2 -g

#create app directory
COPY . /app
WORKDIR /app


# Install dependencies in server
RUN cd ./server
RUN npm i
#run the server
RUN npm start

# Install dependencies in client
RUN cd ../client
RUN npm i

#Expose port
EXPOSE 3000

#start
CMD ["npm", "start"]