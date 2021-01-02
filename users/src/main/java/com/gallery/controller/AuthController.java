package com.gallery.controller;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.ws.rs.core.Response;

import com.gallery.core.request.SignInRequest;
import com.gallery.core.request.UserByTokenRequest;
import com.gallery.core.request.RegisterRequest;
import com.gallery.core.response.RegisterResponse;
import com.gallery.core.response.SignInResponse;
import com.gallery.core.response.UserResponse;
import com.gallery.service.UserService;
import com.nimbusds.jose.shaded.json.JSONObject;

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
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import io.github.cdimascio.dotenv.Dotenv;

@RestController
@RequestMapping(value = "/auth")
@CrossOrigin
public class AuthController {

  @Autowired
  UserService userService;

  private static String AUTHORIZATION_SERVER_URL = "http://localhost:8090/auth";
  private static String REALM = "gallery";
  private static String CLIENT_ID = "login-app";
  private static String CLIENT_SECRET = "67fcf589-36da-4284-8e69-80c02c68d5d3";
  private Keycloak keycloakServiceAccount;

  private Dotenv dotenv;

  public AuthController() {
  }

  @PostConstruct
  private void init() throws Exception {
    dotenv = Dotenv.configure().directory("../.env").ignoreIfMalformed().ignoreIfMissing().load();

    AUTHORIZATION_SERVER_URL = dotenv.get("AUTHORIZATION_SERVER_URL");
    REALM = dotenv.get("REALM");
    CLIENT_ID = dotenv.get("CLIENT_ID");
    CLIENT_SECRET = dotenv.get("CLIENT_SECRET");

    keycloakServiceAccount = KeycloakBuilder.builder().serverUrl(AUTHORIZATION_SERVER_URL).realm(REALM)
        .grantType(OAuth2Constants.CLIENT_CREDENTIALS).clientId(CLIENT_ID).clientSecret(CLIENT_SECRET).build();
  }

  // signin
  // return token.
  @RequestMapping(value = "/signin", method = RequestMethod.POST)
  public ResponseEntity<SignInResponse> signin(@RequestBody SignInRequest signInRequest) {
    // https://stackoverflow.com/questions/62683482/keycloak-rest-api-call-to-get-access-token-of-a-user-through-admin-username-and
    // get token.
    Keycloak instance = Keycloak.getInstance(AUTHORIZATION_SERVER_URL, REALM, signInRequest.getEmail(),
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
  public ResponseEntity<RegisterResponse> register(@RequestBody RegisterRequest registerRequest) {
    // Setup UserRepresentation
    UserRepresentation user = new UserRepresentation();
    user.setEmail(registerRequest.getEmail());
    user.setUsername(registerRequest.getEmail());
    user.setEnabled(true);
    CredentialRepresentation passwordCred = new CredentialRepresentation();
    passwordCred.setTemporary(false);
    passwordCred.setType(CredentialRepresentation.PASSWORD);
    passwordCred.setValue(registerRequest.getPassword());
    user.setCredentials(Arrays.asList(passwordCred));

    // Get realm
    RealmResource realmResource = keycloakServiceAccount.realm(REALM);
    UsersResource userResource = realmResource.users();

    // Create user (requires manage-users role)
    Response response = userResource.create(user);
    System.out.println("Response: " + response.getStatusInfo());
    System.out.println(response.getLocation());
    String keycloakUserId = response.getLocation().getPath().replaceAll(".*/([^/]+)$", "$1");

    System.out.printf("User created with userId: %s%n", keycloakUserId);

    // get token.
    Keycloak instance = Keycloak.getInstance(AUTHORIZATION_SERVER_URL, REALM, user.getEmail(),
        user.getCredentials().get(0).getValue(), CLIENT_ID, CLIENT_SECRET);
    AccessTokenResponse tokenResponse = instance.tokenManager().getAccessToken();

    ResponseEntity<RegisterResponse> registerResponse = userService.registerUser(user.getEmail(), registerRequest.getUsername(), tokenResponse.getToken());

    if (registerResponse.getStatusCode() != HttpStatus.CREATED) {
      userResource.delete(keycloakUserId);
      System.out.printf("Failsafe: Deleted user with userId: %s%n", keycloakUserId);
    }

    return registerResponse;
  }

  @RequestMapping(value = "/user", method = RequestMethod.POST)
  public ResponseEntity<SignInResponse> getUserByToken(@RequestBody UserByTokenRequest userByTokenRequest) {
    // get User Info from AS.
    RestTemplate restTemplate = new RestTemplate();
    HttpHeaders headers = new HttpHeaders();
    headers.setBearerAuth(userByTokenRequest.getToken());
    headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
    HttpEntity<String> entity = new HttpEntity<>("body", headers);
    ResponseEntity<JSONObject> response = restTemplate.exchange(AUTHORIZATION_SERVER_URL + "/realms/" + REALM + "/protocol/openid-connect/userinfo", HttpMethod.POST, entity, JSONObject.class);

    // get User email
    JSONObject respBody = response.getBody();
    String email = (String) respBody.get("email");
    return userService.getUserByEmail(email, userByTokenRequest.getToken());
  }
}
