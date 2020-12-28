package com.gallery.api.gateway.filter;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import com.gallery.api.gateway.model.CustomHttpServletRequest;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;
import com.netflix.zuul.exception.ZuulException;

import org.springframework.stereotype.Component;

@Component
// https://stackoverflow.com/questions/45510905/authentication-to-access-spring-boot-zuul-service-routes
public class CustomAuthPreFilter extends ZuulFilter {
  private final static String REDIRECT_URL = "http://localhost:8090/auth/redirect";
  private final static String CLIENT_ID = "login-app";
  private final static String CLIENT_SECRET = "67fcf589-36da-4284-8e69-80c02c68d5d3";

  @Override
  public boolean shouldFilter() {
    boolean shouldfilter = false;
    RequestContext ctx = RequestContext.getCurrentContext();
    String URI = ctx.getRequest().getRequestURI();

    if (URI.contains("auth/code") || URI.contains("auth/token") || URI.contains("auth/refresh")) {
      shouldfilter = true;
    }
    return shouldfilter;
  }

  @Override
  public Object run() throws ZuulException {
    RequestContext ctx = RequestContext.getCurrentContext();
    HttpServletRequest req = ctx.getRequest();
    String requestURI = req.getRequestURI();
    if (requestURI.contains("auth/code")) {
      Map<String, List<String>> params = ctx.getRequestQueryParams();
      if (params == null) {
        params = Maps.newHashMap();
      }
      params.put("response_type", Lists.newArrayList(new String[] { "code" }));
      // params.put("scope", Lists.newArrayList(new String[] { "read" }));
      params.put("client_id", Lists.newArrayList(new String[] { CLIENT_ID }));
      params.put("redirect_uri", Lists.newArrayList(new String[] { REDIRECT_URL }));
      ctx.setRequestQueryParams(params);
    } else if (requestURI.contains("auth/token")) {
      try {
        String code = extractCookie(req, "code");
        String formParams = String.format("grant_type=%s&client_id=%s&client_secret=%s&username=%s&password=%s",
            "password", CLIENT_ID, CLIENT_SECRET, "user1", "gallery");
        // String formParams = String.format("grant_type=%s&client_id=%s&client_secret=%s&redirect_uri=%s&code=%s",
        //     "authorization_code", CLIENT_ID, CLIENT_SECRET, REDIRECT_URL, code);

        byte[] bytes = formParams.getBytes("UTF-8");
        ctx.setRequest(new CustomHttpServletRequest(req, bytes));
      } catch (IOException e) {
        e.printStackTrace();
      }
    } else if (requestURI.contains("auth/refresh")) {
      try {
        String token = extractCookie(req, "token");
        String formParams = String.format("grant_type=%s&client_id=%s&client_secret=%s&username=%s&password=%s",
            "password", CLIENT_ID, CLIENT_SECRET, "user1", "gallery");
        // String formParams = String.format("grant_type=%s&client_id=%s&client_secret=%s&refresh_token=%s",
        //     "refresh_token", CLIENT_ID, CLIENT_SECRET, token);

        byte[] bytes = formParams.getBytes("UTF-8");
        ctx.setRequest(new CustomHttpServletRequest(req, bytes));
      } catch (IOException e) {
        e.printStackTrace();
      }
    }
    return null;
  }

  @Override
  public String filterType() {
    return "pre";
  }

  @Override
  public int filterOrder() {
    return 6;
  }

  private String extractCookie(HttpServletRequest req, String name) {
    Cookie[] cookies = req.getCookies();
    if (cookies != null) {
      for (int i = 0; i < cookies.length; i++) {
        if (cookies[i].getName().equalsIgnoreCase(name)) {
          return cookies[i].getValue();
        }
      }
    }
    return null;
  }

  // @Override
  // public Object run() throws ZuulException {
  // RequestContext ctx = RequestContext.getCurrentContext();
  // //get your token from request context and send it to auth service via rest template
  // boolean validToken = restTemplate.exchange(or getForObject or other methods of restTemplate which you find suitable for method and return type of your auth service controller method)
  // if(!validToken) {
  //     ctx.setSendZuulResponse(false); //This makes request not forwarding to micro services
  //     ctx.setResponseStatusCode(HttpStatus.UNAUTHORIZED.value());
  //     ValidationResponse validationResponse = new ValidationResponse();
  //     validationResponse.setSuccess(false);
  //     validationResponse.setMessage("Invalid Access...");
  //     ObjectMapper mapper = new ObjectMapper();
  //     String responseBody = mapper.writeValueAsString(validationResponse);
  //     ctx.setResponseBody(validationResponse);
  //     ctx.getResponse().setContentType("application/json");
  //     //If you want to do any thing else like logging etc, you can do it.
  // }
  //   return null;
  // }
}
