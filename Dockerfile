
FROM openjdk:11

COPY ./build/libs/devTest-0.0.1-SNAPSHOT.jar application.jar

ENV TZ=Asia/Seoul

EXPOSE 8888

CMD ["java", "-jar", "/application.jar"]
