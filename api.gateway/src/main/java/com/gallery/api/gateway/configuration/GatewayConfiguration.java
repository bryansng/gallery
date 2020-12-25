package com.gallery.api.gateway.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
public class GatewayConfiguration extends AuthorizationServer {
  public void configure(final HttpSecurity http) throws Exception {
	http.authorizeRequests()
          .antMatchers("/oauth/**")
          .permitAll()
          .antMatchers("/**")
	  .authenticated();
    }
