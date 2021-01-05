#!/bin/bash

if [ "$1" == "build" ]; then
  docker build -t client .
	docker run -it -p 80:80 client:latest
elif [ "$1" == "firsttime" ]; then
  npm install
  npm start
elif [ "$1" == "spring" ]; then
  npm start
else
  docker run -it -p 80:80 client:latest
fi
