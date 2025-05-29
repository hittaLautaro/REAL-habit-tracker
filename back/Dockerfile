# Use OpenJDK 17 as base image (adjust version based on your project)
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy Maven wrapper and pom.xml
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Download dependencies (this layer will be cached if pom.xml doesn't change)
RUN ./mvnw dependency:go-offline -B

# Copy source code
COPY src ./src

# Build the application
RUN ./mvnw package -DskipTests

# Expose the port your Spring Boot app runs on (default is 8080)
EXPOSE 8080

# Run the jar file
CMD ["java", "-jar", "target/*.jar"]