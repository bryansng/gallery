package com.gallery.api.gateway.filter;

import java.io.InputStream;
import java.util.List;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;
import com.netflix.zuul.exception.ZuulException;

import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Component;

@Component
public class CustomAuthPostFilter extends ZuulFilter {
  private final Logger logger = LoggerFactory.getLogger(this.getClass());
  private ObjectMapper mapper = new ObjectMapper();

  @Override
  public boolean shouldFilter() {
    boolean shouldfilter = false;
    RequestContext ctx = RequestContext.getCurrentContext();
    String URI = ctx.getRequest().getRequestURI();

    if (URI.contains("auth/redirect") || URI.contains("auth/token") || URI.contains("auth/refresh")) {
      shouldfilter = true;
    }
    return shouldfilter;
  }

  @Override
  public Object run() throws ZuulException {
    RequestContext ctx = RequestContext.getCurrentContext();
    String requestURI = ctx.getRequest().getRequestURI();

    try {
      Map<String, List<String>> params = ctx.getRequestQueryParams();

      if (requestURI.contains("auth/redirect")) {
        Cookie cookie = new Cookie("code", params.get("code").get(0));
        cookie.setHttpOnly(true);
        cookie.setPath(ctx.getRequest().getContextPath() + "/auth/token");
        ctx.getResponse().addCookie(cookie);
      } else if (requestURI.contains("auth/create") || requestURI.contains("auth/token")
          || requestURI.contains("auth/refresh")) {
        InputStream is = ctx.getResponseDataStream();
        String responseBody = IOUtils.toString(is, "UTF-8");
        if (responseBody.contains("refresh_token")) {
          Map<String, Object> responseMap = mapper.readValue(responseBody, new TypeReference<Map<String, Object>>() {
          });
          String refreshToken = responseMap.get("refresh_token").toString();
          responseMap.remove("refresh_token");
          responseBody = mapper.writeValueAsString(responseMap);

          Cookie cookie = new Cookie("refreshToken", refreshToken);
          cookie.setHttpOnly(true);
          cookie.setPath(ctx.getRequest().getContextPath() + "/auth/refresh");
          cookie.setMaxAge(2592000); // 30 days
          ctx.getResponse().addCookie(cookie);
        }
        ctx.setResponseBody(responseBody);
      }
    } catch (Exception e) {
      logger.error("Error occured in zuul post filter", e);
    }
    return null;
  }

  @Override
  public String filterType() {
    return "post";
  }

  @Override
  public int filterOrder() {
    return 10;
  }
}
