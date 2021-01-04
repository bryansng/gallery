package com.gallery.controller;

import com.gallery.core.request.SignInRequest;
import com.gallery.core.request.UserByTokenRequest;
import com.gallery.core.request.RegisterRequest;
import com.gallery.core.response.RegisterResponse;
import com.gallery.core.response.SignInResponse;
import com.gallery.service.AuthService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/auth")
@CrossOrigin
public class AuthController {

  @Autowired
  private AuthService authService;

  // signin
  @RequestMapping(value = "/signin", method = RequestMethod.POST)
  public ResponseEntity<SignInResponse> signIn(@RequestBody SignInRequest signInRequest) {
    return authService.signIn(signInRequest);
  }

  // register
  @RequestMapping(value = "/register", method = RequestMethod.POST)
  public ResponseEntity<RegisterResponse> register(@RequestBody RegisterRequest registerRequest) {
    return authService.register(null, registerRequest);
  }

  @RequestMapping(value = "/user", method = RequestMethod.POST)
  public ResponseEntity<SignInResponse> getUserByToken(@RequestBody UserByTokenRequest userByTokenRequest) {
    return authService.getUserByToken(userByTokenRequest);
  }
}
