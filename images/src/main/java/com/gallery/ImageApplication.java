package com.gallery;

import java.util.Properties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;
import org.springframework.core.env.Environment;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

// import io.github.cdimascio.dotenv.Dotenv;

@EnableMongoAuditing
// @EnableMongoRepositories({ "com.gallery.*" })
@SpringBootApplication
@EnableDiscoveryClient
public class ImageApplication {
	// @Value("${env.spring.security.oauth2.resourceserver.jwt.issuer-uri}")
	// private static String issuerUri;
	// @Value("${env.spring.security.oauth2.resourceserver.jwt.jwk-set-uri}")
	// private static String jwkSetUri;
	// @Value("${spring.security.oauth2.resourceserver.jwt.issuer-uri}")
	// private static String issuerUriNoEnv;
	// @Value("${spring.security.oauth2.resourceserver.jwt.jwk-set-uri}")
	// private static String jwkSetUriNoEnv;

	// @Autowired
	// private static Environment env;

	// private static Properties properties;
	// @Bean
	// public CommandLineRunner commandLineRunner() {
	// 	return new CommandLineRunner() {
	// 		@Override
	// 		public void run(String... args) throws Exception {
	// 			properties = new Properties();
	// 			System.out.println("fromCLR issuerUri: " + issuerUri);
	// 			System.out.println("fromCLR jwkSetUri: " + jwkSetUri);
	// 			System.out.println("fromCLR issuerUri: " + issuerUriNoEnv);
	// 			System.out.println("fromCLR jwkSetUri: " + jwkSetUriNoEnv);
	// 			properties.put("spring.security.oauth2.resourceserver.jwt.issuer-uri", issuerUri);
	// 			properties.put("spring.security.oauth2.resourceserver.jwt.jwk-set-uri", jwkSetUri);
	// 		}
	// 	};
	// }

	public static void main(String[] args) {
		SpringApplication application = new SpringApplication(ImageApplication.class);
		// System.out.println("issuerUri: " + issuerUri);
		// System.out.println("jwkSetUri: " + jwkSetUri);
		// System.out.println("issuerUri: " + issuerUriNoEnv);
		// System.out.println("jwkSetUri: " + jwkSetUriNoEnv);

		// Properties properties = new Properties();
		// System.out.println("issuerUri: " + env.getProperty("spring.security.oauth2.resourceserver.jwt.issuer-uri"));
		// System.out.println("jwkSetUri: " + env.getProperty("spring.security.oauth2.resourceserver.jwt.jwk-set-uri"));
		// properties.put("spring.security.oauth2.resourceserver.jwt.issuer-uri",
		// 		env.getProperty("spring.security.oauth2.resourceserver.jwt.issuer-uri"));
		// properties.put("spring.security.oauth2.resourceserver.jwt.jwk-set-uri",
		// 		env.getProperty("spring.security.oauth2.resourceserver.jwt.jwk-set-uri"));
		// application.setDefaultProperties(properties);

		// Properties properties = new Properties();
		// System.out.println("issuerUri: " + System.getenv("spring.security.oauth2.resourceserver.jwt.issuer-uri"));
		// System.out.println("jwkSetUri: " + System.getenv("spring.security.oauth2.resourceserver.jwt.jwk-set-uri"));
		// properties.put("spring.security.oauth2.resourceserver.jwt.issuer-uri",
		// 		System.getenv("spring.security.oauth2.resourceserver.jwt.issuer-uri"));
		// properties.put("spring.security.oauth2.resourceserver.jwt.jwk-set-uri",
		// 		System.getenv("spring.security.oauth2.resourceserver.jwt.jwk-set-uri"));
		// application.setDefaultProperties(properties);

		// Dotenv dotenv = Dotenv.configure().directory(".env").ignoreIfMalformed().ignoreIfMissing().load();

		// Properties properties = new Properties();
		// properties.put("spring.security.oauth2.resourceserver.jwt.issuer-uri",
		// 		dotenv.get("spring.security.oauth2.resourceserver.jwt.issuer-uri"));
		// properties.put("spring.security.oauth2.resourceserver.jwt.jwk-set-uri",
		// 		dotenv.get("spring.security.oauth2.resourceserver.jwt.jwk-set-uri"));
		// application.setDefaultProperties(properties);

		// application.setDefaultProperties(properties);
		application.run(args);
	}
}
