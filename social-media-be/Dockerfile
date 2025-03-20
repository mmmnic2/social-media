FROM maven:3.8.5-openjdk-17 AS build

WORKDIR /app

# Copy toàn bộ project, bao gồm pom.xml và src/
COPY . .

# Build project
RUN mvn clean package -DskipTests -Dfile.encoding=UTF-8

FROM openjdk:17.0.1-jdk-slim

WORKDIR /app

# Copy file JAR từ build stage
COPY --from=build /app/target/socialmedia-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
