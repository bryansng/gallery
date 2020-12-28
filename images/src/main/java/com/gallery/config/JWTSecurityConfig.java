package com.gallery.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class JWTSecurityConfig extends WebSecurityConfigurerAdapter {
  @Override
  protected void configure(HttpSecurity http) throws Exception {
    // http.cors().and().authorizeRequests().antMatchers(HttpMethod.GET, "/user/info", "/**").hasAuthority("SCOPE_read")
    //     .antMatchers(HttpMethod.POST, "/**").hasAuthority("SCOPE_write").anyRequest().authenticated().and()
    //     .oauth2ResourceServer().jwt();

    http.csrf().disable().authorizeRequests().antMatchers(HttpMethod.GET, "/image/**").permitAll()
        .antMatchers(HttpMethod.POST, "/image/**").authenticated().antMatchers(HttpMethod.PUT, "/image/**")
        .authenticated().antMatchers(HttpMethod.DELETE, "/image/**").authenticated().and()
        .oauth2ResourceServer(oauth2 -> oauth2.jwt());

    // http.csrf().disable().authorizeRequests().antMatchers("/").permitAll().anyRequest().permitAll().and()
    //     .oauth2ResourceServer(oauth2 -> oauth2.jwt());

    // http.csrf().disable().authorizeRequests().antMatchers("/").permitAll().antMatchers("/image/**").permitAll()
    //     .antMatchers("/api/images/image/**").permitAll().antMatchers("/api").permitAll().anyRequest().permitAll().and()
    //     .oauth2ResourceServer(oauth2 -> oauth2.jwt());

    // http.authorizeRequests(authz -> authz.antMatchers(HttpMethod.GET, "/image/**").permitAll().anyRequest().permitAll())
    //     .oauth2ResourceServer(oauth2 -> oauth2.jwt());

    // http.csrf().disable();

    // http.authorizeRequests(authz -> authz.antMatchers(HttpMethod.GET, "/image/**").permitAll()
    //     .antMatchers(HttpMethod.POST, "/image").hasAuthority("SCOPE_write").anyRequest().authenticated())
    //     .oauth2ResourceServer(oauth2 -> oauth2.jwt());

    // http.authorizeRequests(authz -> authz.antMatchers(HttpMethod.GET, "/image/**").hasAuthority("SCOPE_read")
    //     .antMatchers(HttpMethod.POST, "/image").hasAuthority("SCOPE_write").anyRequest().authenticated())
    //     .oauth2ResourceServer(oauth2 -> oauth2.jwt());
  }
}
