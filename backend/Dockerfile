FROM bellsoft/liberica-openjdk-debian:23.0.2 AS builder
WORKDIR /application
COPY .mvn ./.mvn
COPY ./pom.xml ./mvnw ./
COPY ./app ./app
COPY ./securitycommon ./securitycommon
COPY ./passwordtool ./passwordtool
RUN --mount=type=cache,target=/root/.m2  chmod +x mvnw && ./mvnw clean install -Dmaven.test.skip

FROM bellsoft/liberica-openjre-debian:23.0.2 AS layers
WORKDIR /application
COPY --from=builder /application/app/target/*.jar app.jar
run ls
RUN java -Djarmode=layertools -jar app.jar extract

FROM bellsoft/liberica-openjre-debian:23.0.2
VOLUME /tmp
RUN useradd -ms /bin/bash spring-user
USER spring-user
COPY --from=layers /application/dependencies/ ./
COPY --from=layers /application/spring-boot-loader/ ./
COPY --from=layers /application/snapshot-dependencies/ ./
COPY --from=layers /application/application/ ./

ENTRYPOINT ["java", "org.springframework.boot.loader.launch.JarLauncher"]
