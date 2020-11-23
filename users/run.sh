#!/bin/bash

# if [ "$1" == "fromscratch" ]; then
#   docker-compose down -v
#   mvn clean
#   mvn package
#   docker-compose up --build
# elif [ "$1" == "tearbuild" ]; then
#   docker-compose down -v
#   docker-compose up --build --remove-orphans
# elif [ "$1" == "build" ]; then
#   docker-compose up --build
# elif [ "$1" == "clientfromscratch" ]; then
#   host="localhost"
#   port="8080"
#   mvn clean -pl client
#   mvn package -pl client
#   mvn exec:java -Dexec.args="-h $host -p $port" -pl client
# elif [ "$1" == "client" ]; then
#   host="localhost"
#   port="8080"
#   mvn exec:java -Dexec.args="-h $host -p $port" -pl client
# else
#   # docker-compose up --remove-orphans
#   mvn exec:java -pl api.gateway
# fi
# mvn package


# mvn exec:java -Dexec.mainClass=com.gallery.UserApplication
mvn spring-boot:run
