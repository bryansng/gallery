# FROM openjdk:8-jre-alpine
FROM openjdk:11.0.8-jre
COPY target/oauth-authorization-server-0.0.1.jar ./service/oauth-authorization-server.jar
# CMD /usr/bin/java -jar /oauth-authorization-server.jar
CMD java -jar ./service/oauth-authorization-server.jar
# CMD /usr/local/openjdk-11/bin/java -cp /oauth-authorization-server.jar service/Broker -h $ACTIVEMQ_NAME -p $ACTIVEMQ_PORT -t $TIMEOUT_SECONDS -qs $MIN_NUM_QUOTATIONS