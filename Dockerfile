FROM ubuntu

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
WORKDIR /app/server
RUN npm i
#run the server
RUN npm start

# Install dependencies in client
WORKDIR /app/client
RUN npm i

#Expose port
EXPOSE 3000

#start
CMD ["npm", "start"]