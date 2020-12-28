package com.gallery.api.gateway;

import com.gallery.api.gateway.filter.CustomAuthPreFilter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableZuulProxy
@EnableDiscoveryClient
public class Application {
	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	// @Bean
	// public CustomAuthPreFilter authFilter() {
	// 	return new CustomAuthPreFilter();
	// }
}
