FROM eclipse-temurin:21-jre
VOLUME /tmp
COPY target/keynote-service-*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]