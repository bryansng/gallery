# FROM openjdk:8-jre-alpine
FROM openjdk:11.0.8-jre
# COPY .env .env
COPY target/annotations-0.0.1.jar ./service/annotations.jar
# CMD /usr/bin/java -jar /annotations.jar
CMD sleep 10 && java -jar ./service/annotations.jar
# CMD /usr/local/openjdk-11/bin/java -cp /annotations.jar service/Broker -h $ACTIVEMQ_NAME -p $ACTIVEMQ_PORT -t $TIMEOUT_SECONDS -qs $MIN_NUM_QUOTATIONS