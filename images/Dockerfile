# FROM openjdk:8-jre-alpine
FROM openjdk:11.0.8-jre
# COPY .env .env
COPY target/images-0.0.1.jar ./service/images.jar
# CMD /usr/bin/java -jar /images.jar
CMD sleep $STARTUP_DELAY && java -jar ./service/images.jar
# CMD /usr/local/openjdk-11/bin/java -cp /images.jar service/Broker -h $ACTIVEMQ_NAME -p $ACTIVEMQ_PORT -t $TIMEOUT_SECONDS -qs $MIN_NUM_QUOTATIONS