package com.gallery.controller;

import java.util.Arrays;
import java.util.Collections;

import javax.ws.rs.core.Response;

import com.gallery.core.SignInRequest;
import com.gallery.core.UserRequest;
import com.gallery.core.response.RegisterResponse;
import com.gallery.core.response.SignInResponse;
import com.gallery.core.response.UserResponse;
import com.gallery.service.UserService;

import org.keycloak.OAuth2Constants;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.UsersResource;
import org.keycloak.representations.AccessTokenResponse;
import org.keycloak.representations.idm.ClientRepresentation;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/auth")
public class AuthController {

  @Autowired
  UserService userService;

  private final static String authServerUrl = "http://localhost:8090/auth";
  private final static String REALM = "gallery";
  private final static String CLIENT_ID = "login-app";
  private final static String CLIENT_SECRET = "67fcf589-36da-4284-8e69-80c02c68d5d3";
  private Keycloak keycloakServiceAccount;

  public AuthController() {
    keycloakServiceAccount = KeycloakBuilder.builder().serverUrl(authServerUrl).realm(REALM)
        .grantType(OAuth2Constants.CLIENT_CREDENTIALS).clientId(CLIENT_ID).clientSecret(CLIENT_SECRET).build();
  }

  // signin
  // return token.
  @RequestMapping(value = "/signin", method = RequestMethod.GET)
  public ResponseEntity<SignInResponse> signin(@RequestBody SignInRequest signInRequest) {
    // https://stackoverflow.com/questions/62683482/keycloak-rest-api-call-to-get-access-token-of-a-user-through-admin-username-and
    // get token.
    Keycloak instance = Keycloak.getInstance(authServerUrl, REALM, signInRequest.getEmail(),
        signInRequest.getPassword(), CLIENT_ID, CLIENT_SECRET);
    AccessTokenResponse tokenResponse = instance.tokenManager().getAccessToken();

    return userService.getUserByEmail(signInRequest.getEmail(), tokenResponse.getToken());
  }

  // register
  // create new user.
  // return token.
  //
  // UserRepresentation expected email, username, enabled and credentials filled.
  @RequestMapping(value = "/register", method = RequestMethod.POST)
  public ResponseEntity<RegisterResponse> register(@RequestBody UserRepresentation user) {
    // Get realm
    RealmResource realmResource = keycloakServiceAccount.realm(REALM);
    UsersResource userResource = realmResource.users();

    // Create user (requires manage-users role)
    Response response = userResource.create(user);
    System.out.println("Response: " + response.getStatusInfo());
    System.out.println(response.getLocation());
    String userId = response.getLocation().getPath().replaceAll(".*/([^/]+)$", "$1");

    System.out.printf("User created with userId: %s%n", userId);

    // get token.
    Keycloak instance = Keycloak.getInstance(authServerUrl, REALM, user.getEmail(),
        user.getCredentials().get(0).getValue(), CLIENT_ID, CLIENT_SECRET);
    AccessTokenResponse tokenResponse = instance.tokenManager().getAccessToken();

    return userService.registerUser(user.getEmail(), user.getUsername(), tokenResponse.getToken());
  }

  // logout?

  // grant tokens?
}
