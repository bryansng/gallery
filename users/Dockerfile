# FROM openjdk:8-jre-alpine
FROM openjdk:11.0.8-jre
COPY target/users-0.0.1.jar /users.jar
# CMD /usr/bin/java -jar /users.jar
CMD sleep $STARTUP_DELAY && java -jar users.jar
# CMD /usr/local/openjdk-11/bin/java -cp /users.jar service/Broker -h $ACTIVEMQ_NAME -p $ACTIVEMQ_PORT -t $TIMEOUT_SECONDS -qs $MIN_NUM_QUOTATIONS