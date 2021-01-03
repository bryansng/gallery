# FROM openjdk:8-jre-alpine
FROM openjdk:11.0.8-jre
COPY target/servicediscovery-0.0.1.jar /servicediscovery.jar
# CMD /usr/bin/java -jar /servicediscovery.jar
CMD java -jar servicediscovery.jar
# CMD /usr/local/openjdk-11/bin/java -cp /servicediscovery.jar service/Broker -h $ACTIVEMQ_NAME -p $ACTIVEMQ_PORT -t $TIMEOUT_SECONDS -qs $MIN_NUM_QUOTATIONS