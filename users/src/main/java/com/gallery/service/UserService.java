package com.gallery.service;

import java.time.LocalDateTime;

import javax.annotation.PostConstruct;

import com.gallery.config.MongoConfig;
import com.gallery.constants.Constants;
import com.gallery.core.response.RegisterResponse;
import com.gallery.core.response.SignInResponse;
import com.gallery.core.request.UserRequest;
import com.gallery.core.response.UserResponse;
import com.gallery.model.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class UserService {

  @Autowired
  private MongoConfig mongoConfig;

  @Autowired
  private ApplicationArguments appArgs;

  private MongoTemplate mongoTemplate;

  public UserService() {

  }

  @PostConstruct
  private void init() throws Exception {
    mongoTemplate = mongoConfig.mongoTemplate();
  }

  public ResponseEntity<RegisterResponse> registerUser(String email, String username, String token) {
    boolean userExists = mongoTemplate.exists(Query.query(Criteria.where("username").is(username)), User.class,
        Constants.USER_COLLECTION);

    if (userExists) {
      return new ResponseEntity<>(new RegisterResponse("Username exists", null, null), HttpStatus.BAD_REQUEST);
    }

    User user = new User(username, email, LocalDateTime.now());

    RestTemplate restTemplate = new RestTemplate();
    HttpEntity<User> request = new HttpEntity<>(user);
    restTemplate.postForObject(Constants.SEARCH_SERVICE_USER_POST, request, Object.class);

    user = mongoTemplate.insert(user, Constants.USER_COLLECTION);

    return new ResponseEntity<>(new RegisterResponse("User registered successfully.", user, token), HttpStatus.CREATED);
  }

  // signin
  public ResponseEntity<SignInResponse> getUserByEmail(String email, String token) {
    User user = mongoTemplate.findOne(Query.query(Criteria.where("email").is(email)), User.class,
        Constants.USER_COLLECTION);

    if (user == null) {
      return new ResponseEntity<>(new SignInResponse("Email does not exist", null, null), HttpStatus.NOT_FOUND);
    }

    return new ResponseEntity<>(new SignInResponse("Logged in successfully.", user, token), HttpStatus.OK);
  }

  /**
   * Get user
   *
   * @param username
   * @return
   */
  public ResponseEntity<UserResponse> getUser(String username) {
    User user = mongoTemplate.findOne(Query.query(Criteria.where("username").is(username)), User.class,
        Constants.USER_COLLECTION);

    if (user == null) {
      return new ResponseEntity<>(new UserResponse("Username does not exist", null), HttpStatus.NOT_FOUND);
    }

    return new ResponseEntity<>(new UserResponse("Retrieved user", user), HttpStatus.OK);
  }

  /**
   * Update user
   *
   * @param currUsername
   * @param newUsername
   * @return
   */
  public ResponseEntity<UserResponse> updateUsername(String currUsername, UserRequest userRequest) {
    User user = mongoTemplate.findOne(Query.query(Criteria.where("username").is(currUsername)), User.class,
        Constants.USER_COLLECTION);

    if (user == null) {
      return new ResponseEntity<>(new UserResponse("Username does not exist", null), HttpStatus.NOT_FOUND);
    }

    String newUsername = userRequest.getUsername();
    user.setUsername(newUsername);
    user = mongoTemplate.save(user, Constants.USER_COLLECTION);

    RestTemplate restTemplate = new RestTemplate();
    HttpEntity<User> request = new HttpEntity<>(user);
    restTemplate.exchange(Constants.SEARCH_SERVICE_USER_UPDATE + user.getId(), HttpMethod.PUT, request, Object.class);

    return new ResponseEntity<>(new UserResponse("Username updated from " + currUsername + " to " + newUsername, user),
        HttpStatus.OK);
  }

  /**
     * Delete user
     *
     * @param username
     * @return
     */
  public ResponseEntity<UserResponse> deleteUser(String username) {
    User user = mongoTemplate.findOne(Query.query(Criteria.where("username").is(username)), User.class,
        Constants.USER_COLLECTION);

    if (user == null) {
      return new ResponseEntity<>(new UserResponse("Username does not exist", null), HttpStatus.NOT_FOUND);
    }

    mongoTemplate.remove(user, Constants.USER_COLLECTION);

    RestTemplate restTemplate = new RestTemplate();
    HttpEntity<String> request = new HttpEntity<>(user.getId());
    restTemplate.delete(Constants.SEARCH_SERVICE_USER_DELETE + user.getId(), request);

    return new ResponseEntity<>(new UserResponse("User deleted", user), HttpStatus.OK);
  }
}
