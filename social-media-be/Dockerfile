#FROM openjdk:17
FROM openjdk:17-jdk-slim
RUN ln -snf /usr/share/zoneinfo/Asia/Ho_Chi_Minh /etc/localtime && echo Asia/Ho_Chi_Minh > /etc/timezone
WORKDIR /app
COPY target/socialmedia-0.0.1-SNAPSHOT.jar app.jar

ENTRYPOINT ["java","-jar","target/myapp.jar"]


#FROM openjdk:17
#RUN ln -snf /usr/share/zoneinfo/Asia/Ho_Chi_Minh /etc/localtime && echo Asia/Ho_Chi_Minh > /etc/timezone
#WORKDIR /app
#COPY target/music-manager-main-0.0.1-SNAPSHOT.jar app.jar
#
#ENTRYPOINT ["java", "-jar", "target/myapp.jar"]

