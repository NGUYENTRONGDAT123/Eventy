FROM ubuntu

#update
ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get update

#Install npm
RUN apt-get install npm -y

#Install nodemon
RUN npm i nodemon -g

#create app directory
COPY /Eventy /Eventy
RUN ls

# Install dependencies in client
WORKDIR /Eventy/client
RUN npm i
# Build client
RUN npm run build

# Install dependencies in server
WORKDIR /Eventy/server
RUN npm i

#Expose port
EXPOSE 3001

#start
CMD ["npm", "start"]