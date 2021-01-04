package com.gallery;

import java.util.Properties;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@EnableMongoAuditing
// @EnableMongoRepositories({ "com.gallery.*" })
@SpringBootApplication
@EnableDiscoveryClient
public class ImageApplication {

	public static void main(String[] args) {
		SpringApplication application = new SpringApplication(ImageApplication.class);

		Properties properties = new Properties();
		properties.put("spring.security.oauth2.resourceserver.jwt.issuer-uri", args[0]);
		properties.put("spring.security.oauth2.resourceserver.jwt.jwk-set-uri", args[1]);
		// properties.put("spring.security.oauth2.resourceserver.jwt.issuer-uri",
		// 		appArgs.getOptionValues("spring.security.oauth2.resourceserver.jwt.issuer-uri").get(0));
		// properties.put("spring.security.oauth2.resourceserver.jwt.jwk-set-uri",
		// 		appArgs.getOptionValues("spring.security.oauth2.resourceserver.jwt.jwk-set-uri").get(0));
		application.setDefaultProperties(properties);

		application.run(args);
	}
}
