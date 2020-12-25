package com.gallery.api.gateway.filter;

import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;
import com.netflix.zuul.exception.ZuulException;

// https://stackoverflow.com/questions/45510905/authentication-to-access-spring-boot-zuul-service-routes
public class AuthFilter extends ZuulFilter {

  @Override
  public boolean shouldFilter() {
    return true;
  }

  @Override
  public Object run() throws ZuulException {
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
    return null;
  }

  @Override
  public String filterType() {
    return "pre";
  }

  @Override
  public int filterOrder() {
    return 1;
  }

}
