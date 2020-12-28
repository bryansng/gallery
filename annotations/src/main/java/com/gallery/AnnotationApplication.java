package com.gallery;

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

		Dotenv dotenv = Dotenv.configure().directory("../.env").ignoreIfMalformed().ignoreIfMissing().load();

		Properties properties = new Properties();
		properties.put("spring.security.oauth2.resourceserver.jwt.issuer-uri",
				dotenv.get("spring.security.oauth2.resourceserver.jwt.issuer-uri"));
		properties.put("spring.security.oauth2.resourceserver.jwt.jwk-set-uri",
				dotenv.get("spring.security.oauth2.resourceserver.jwt.jwk-set-uri"));
		application.setDefaultProperties(properties);

		application.run(args);
  }
}
