# Gallery

- [Gallery](#gallery)
  - [Intro](#intro)
    - [Main features](#main-features)
  - [To run](#to-run)
  - [Tech stack](#tech-stack)
    - [Example retrieval](#example-retrieval)
    - [Dockerizing](#dockerizing)
  - [Reflection](#reflection)
    - [Comparisons of our stack vs other tools](#comparisons-of-our-stack-vs-other-tools)
    - [Pros & cons of our stack](#pros--cons-of-our-stack)
    - [Wish list](#wish-list)
    - [What we could do better](#what-we-could-do-better)
  - [Developing (locally, without Docker)](#developing-locally-without-docker)
    - [Prerequisites](#prerequisites)
    - [To run](#to-run-1)

## Intro

Social Gallery Image Annotation, think genius.com for images and reddit up/down voting for the annotations.

### Main features

- Signed in users can upload images (with titles and descriptions) and add annotations to uploaded images by drawing boxes over the desired areas.
- Annotations may be up or down voted similar to Reddit's commenting system.
- The homepage shows recent uploads and annotations.
- Users have profiles showing their uploaded images and annotations.
- Search is enabled for users by username and images by their titles and descriptions.

## To run
1. At root, run `./run.sh fromscratch`, or in your terminal:
```
  docker-compose down -v
  mvn clean
  mvn install
  docker-compose up --build --remove-orphans
```
2. Head to the client directory and run `./run.sh spring` or `cd client && npm install && npm run`

## Tech stack

![Image of Project Architecture](tech stack.png)

*Eureka* and *Zuul* act as the **service discovery** and **API gateway** of the application respectively, aka the "front door". Eureka keeps track of where the services are while Zuul routes every request (e.g. POSTing and GETing users/images/annotations) to the appropriate service. Zuul (complemented by Eureka) also provides load balancing between instances of the same service round-robin style, e.g. multiple annotations service.

**Users, images, and annotations** are created and stored via their respective REST APIs and *MongoRepositories* (MongoDB).

The **authorization server** authenticates users via *Keycloak* (embedded in Spring Boot), an open source identity and access management solution. In this project, Keycloak manages users and their access tokens, and Spring Boot handles the Keycloak Authorization Server.

**Search** is provided via *Elastic Search* which indexes images (ids, titles, and descriptions) and users (ids and usernames) internally with Lucene. Our search service provides the APIs to talk to ES and determines how images and users are indexed in ES.

The **client** is a single page application built with *React*, react-bootstrap, Tachyons the css utility, and more.
### Example retrieval

User creation: user registers via client -> client POSTs user data to API gateway -> API gateway routes that request to user service -> user service tells Keycloak to create new user and token -> Keycloak provides the token and success response to user service -> user service informs search service to index the new user -> search service sends success response to user service -> user service tells client via api gateway the user token and that user creation is successful and logged in.

Signed in refreshing the page: client POSTs user token to API gateway -> API gateway routes request to user service -> user service verifies token with Keycloak -> Keycloak confirms with user service -> user service returns the user data back the route it came from.

### Dockerizing

We used docker-compose to dockerize all 7 services (except client) similarly to the tech stack outlined. Each of the `images`, `users`, and `annotations` services are a container and have their respective MongoDB containers. They depend on the `authserver`. The `search` service has its own container but depends on the Elastic Search container. All services (and their related MongoDB) depend on `servicediscovery` and `apigateway` services.

## Reflection

### Comparisons of our stack vs other tools
1. Eureka and Zuul and Nginx both provide service discovery and API gateway, but Nginx's load balancing is a paid service.
2. React vs Thymeleaf

### Pros & cons of our stack
| Pros | Cons |
| ---- | ---- |
| | There are additional points of failure in user or image creation due to the need of informing the service itself, the search service, and the authserver. |

### Wish list

- We ran into issues configuring Redis to cache user data or aggregated responses at the API gateway. This would have shorten the hops between client and Keycloak to verify the user token and prevent us from re-requesting data repeatedly. However, we would need to manually keep track if the cache data is outdated with a LRU policy.
- Enabling editing and deleting features for the client. These are available via the API but not via the client.
- Refactoring the code further as there are some duplications, particularly in client.
- Kubernetes and CI/CD

### What we could do better
- Look into combining the authserver and user service, since Keycloak can handle more than just user credentials and tokens. This could decrease the hops needed just to verify user tokens and the number of points of failure when creating users.
- Look into using Nginx to cache images.

## Developing (locally, without Docker)

### Prerequisites

Maven, Spring Boot, elastic search, npm, Docker. Note that this can be RAM intensive.

Elastic search

1. [Download the zip file](https://www.elastic.co/downloads/elasticsearch).
2. Unzip somewhere.
3. Start one (1) cluster by running `bin/elasticsearch.bat`.
4. Check if it's running at http://localhost:9200 with `curl http://localhost:9200`.
5. Alternatively run `bin/elasticsearch-service.bat install` to install it as a service, and `bin/elasticsearch-service.bat start` to start it.

### To run

1. `mvn install` at root.
2. Ensure MongoDB and Elastic Search services are on.
3. Run individual modules with `run.sh` in their respective directories or `mvn spring-boot:run -pl module_name`, in the order of `service.discovery`, `api.gateway`, `authorization-server`, `search`, `users`, `images`, `annotations`. See http://localhost:8761 to see what services are online.
4. `cd client && npm install && npm start` and navigate to http://localhost:3000 to see the client.
