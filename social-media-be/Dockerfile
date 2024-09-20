#FROM openjdk:17
#FROM openjdk:17
#RUN ln -snf /usr/share/zoneinfo/Asia/Ho_Chi_Minh /etc/localtime && echo Asia/Ho_Chi_Minh > /etc/timezone
#WORKDIR /app
#COPY target/socialmedia-0.0.1-SNAPSHOT.jar app.jar
#EXPOSE 8080
#ENTRYPOINT ["java", "-jar", "app.jar"]



FROM maven:3.8.5-openjdk-17 AS build

COPY . .

RUN mvn clean package -DskipTests -Dfile.encoding=UTF-8

FROM openjdk:17.0.1-jdk-slim

COPY --from=build /target/socialmedia-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java","-jar","app.jar"]

