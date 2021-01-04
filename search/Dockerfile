# FROM openjdk:8-jre-alpine
FROM openjdk:11.0.8-jre
COPY target/search-0.0.1.jar /search.jar
# CMD /usr/bin/java -jar /search.jar
CMD sleep 10 && java -jar search.jar
# CMD /usr/local/openjdk-11/bin/java -cp /search.jar service/Broker -h $ACTIVEMQ_NAME -p $ACTIVEMQ_PORT -t $TIMEOUT_SECONDS -qs $MIN_NUM_QUOTATIONS