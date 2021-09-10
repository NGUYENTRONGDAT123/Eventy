FROM NODE:14

# Copy app source
COPY . /src

#create src directory
WORKDIR /src

#install app dependencies
RUN npm i

#Export port to outside world
EXPOSE 3000

CMD ["npm", "start"]