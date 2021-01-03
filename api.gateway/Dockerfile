# FROM openjdk:8-jre-alpine
FROM openjdk:11.0.8-jre
COPY target/apigateway-0.0.1.jar /apigateway.jar
# CMD /usr/bin/java -jar /apigateway.jar
CMD sleep 5 && java -jar apigateway.jar
# CMD /usr/local/openjdk-11/bin/java -cp /apigateway.jar service/Broker -h $ACTIVEMQ_NAME -p $ACTIVEMQ_PORT -t $TIMEOUT_SECONDS -qs $MIN_NUM_QUOTATIONS