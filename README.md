# Eventy

CAB432 Asignment

This is an assignment dedicate mashing up api

## Installation (Recommend using Linux Ubuntu)

Step 1: Open Terminal and Install Docker

```
sudo curl -fsSL https://get.docker.com/ | sh
```

Step 2: Build the image

```
sudo docker build -t [IMAGE_NAME_HERE] .
```

Step 3: Run the Container from the created Image

```
sudo docker run --name [CONTAINER_NAME_HERE] -p [YOUR_PORT_HERE]:3001 -i -d -t [IMAGE_NAME_HERE]
```

Step 4: Open your broswer and open the localhost

```
http://localhost:[YOUR_PORT_HERE]
```
