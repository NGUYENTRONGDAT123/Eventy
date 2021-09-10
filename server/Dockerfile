FROM NODE:14

#Install nodemon
RUN npm i nodemon -g

#create app directory
WORKDIR /app

#Copy files to app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./

# Install dependencies
RUN npm i

#Expose port
EXPOSE 3001

#start
CMD ["npm", "start"]