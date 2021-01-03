#!/bin/bash

if [ "$1" == "docker" ]; then
	docker run -it search:latest
elif [ "$1" == "fromscratch" ]; then
	mvn clean
  mvn package
  docker run -it search:latest
elif [ "$1" == "spring" ]; then
  mvn spring-boot:run
else
  docker run -it search:latest
fi
