package com.gallery.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class APIGatewayController {

  public APIGatewayController() {
  }

  @RequestMapping(value = "/healthcheck", method = RequestMethod.GET)
  public ResponseEntity<String> healthCheck() {
    return new ResponseEntity<>("API Healthcheck", HttpStatus.OK);
  }
}
