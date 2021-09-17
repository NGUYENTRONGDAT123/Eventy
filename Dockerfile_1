FROM ubuntu

#update
ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get update

#Install npm
RUN apt-get install npm -y

#Install nodemon
RUN npm i nodemon -g

#create app directory
COPY . /app

# Install dependencies in client
WORKDIR /app/client
RUN npm i
# Build client
RUN npm run build

# Install dependencies in server
WORKDIR /app/server
RUN npm i

#Expose port
EXPOSE 3001

#start
CMD ["npm", "start"]