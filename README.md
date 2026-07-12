# Booking MicroService Project

This project is a Spring Boot microservices setup with Eureka service discovery and an API gateway.

## Services and Ports

| Service | Port | Description |
|---|---:|---|
| Eureka Server | 8762 | Service registry |
| API Gateway | 8083 | Entry point for routed requests |
| Property Service | 8084 | Property-related operations |
| Booking Service | 8085 | Booking-related operations |
| User Service | 8090 | User-related operations |

## Project Structure

- api-gateway: API gateway routing service
- eureka-server: Spring Cloud Eureka registry
- property-service: Property microservice
- booking-service: Booking microservice
- user-service: User microservice

## Prerequisites

- Java 17+
- Maven

## Run the Services

Open separate terminals and run each service from its folder:

```bash
cd eureka-server
mvn spring-boot:run
```

```bash
cd api-gateway
mvn spring-boot:run
```

```bash
cd property-service
mvn spring-boot:run
```

```bash
cd booking-service
mvn spring-boot:run
```

```bash
cd user-service
mvn spring-boot:run
```

## Access Points

- Eureka Dashboard: http://localhost:8762
- API Gateway: http://localhost:8083
- Property Service: http://localhost:8084
- Booking Service: http://localhost:8085
- User Service: http://localhost:8086

## Notes

- The services use H2 in-memory databases for local development.
- Eureka registration is enabled for the microservices.
- The gateway can discover services through Eureka