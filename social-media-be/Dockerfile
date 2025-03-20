FROM maven:3.8.5-openjdk-17 AS build

# Tạo thư mục làm việc trong container
WORKDIR /app

# Copy file cấu hình Maven trước để cache dependencies
COPY pom.xml ./
RUN mvn dependency:go-offline

# Copy toàn bộ source code
COPY src ./src

# Build project
RUN mvn clean package -DskipTests -Dfile.encoding=UTF-8

FROM openjdk:17.0.1-jdk-slim

WORKDIR /app

# Copy file JAR từ stage build
COPY --from=build /app/target/socialmedia-0.0.1-SNAPSHOT.jar app.jar

# Mở cổng 8080
EXPOSE 8080

# Chạy ứng dụng
ENTRYPOINT ["java","-jar","app.jar"]
