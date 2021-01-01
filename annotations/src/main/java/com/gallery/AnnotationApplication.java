package com.gallery;

import java.util.Properties;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@EnableMongoAuditing
@EnableMongoRepositories({ "com.gallery.*" })
@SpringBootApplication
@EnableDiscoveryClient
public class AnnotationApplication {

	public static void main(String[] args) {
		SpringApplication application = new SpringApplication(AnnotationApplication.class);
		Properties properties = new Properties();
		System.out.println(args[0]);
		System.out.println(args[1]);
		properties.put("spring.security.oauth2.resourceserver.jwt.issuer-uri", args[0]);
		properties.put("spring.security.oauth2.resourceserver.jwt.jwk-set-uri", args[1]);
		// properties.put("spring.security.oauth2.resourceserver.jwt.issuer-uri",
		// 		"http://localhost:8090/auth/realms/gallery");
		// properties.put("spring.security.oauth2.resourceserver.jwt.jwk-set-uri",
		// 		"http://localhost:8090/auth/realms/gallery/protocol/openid-connect/certs");
		application.setDefaultProperties(properties);

		application.run(args);
	}
}
// --${SPRING_SEC1}=${SPRING_SEC1_VAL}
// SPRING_SEC1=spring.security.oauth2.resourceserver.jwt.issuer-uri
// SPRING_SEC2=spring.security.oauth2.resourceserver.jwt.jwk-set-uri
// http://localhost:8090/auth/realms/gallery
// http://localhost:8090/auth/realms/gallery/protocol/openid-connect/certs