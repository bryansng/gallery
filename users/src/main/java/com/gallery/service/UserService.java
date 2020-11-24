package com.gallery.service;

import javax.annotation.PostConstruct;

import com.gallery.config.MongoConfig;
import com.gallery.constants.Constants;
import com.gallery.core.response.UserResponse;
import com.gallery.model.User;
import com.gallery.model.UserSequence;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private MongoTemplate mongoTemplate;

    @Autowired
    private UserSequenceService userSequenceService;
    @Autowired
    private MongoConfig mongoConfig;

    public UserService() {

    }

    @PostConstruct
    private void init() throws Exception {
        mongoTemplate = mongoConfig.mongoTemplate();
    }

    public ResponseEntity<UserResponse> createUser(String username) {
        boolean userExists = mongoTemplate.exists(Query.query(Criteria.where("username").is(username)), User.class,
                Constants.USER_COLLECTION);

        if (userExists) {
            return new ResponseEntity<>(new UserResponse("Username exists", null), HttpStatus.BAD_REQUEST);
        }

        Long id = userSequenceService.getNext();
        User user = new User(id, username);

        mongoTemplate.insert(user, Constants.USER_COLLECTION);
        mongoTemplate.insert(new UserSequence(id), Constants.USER_SEQUENCE_COLLECTION);

        return new ResponseEntity<>(new UserResponse("User created", user), HttpStatus.CREATED);
    }

    public ResponseEntity<UserResponse> getUser(String username) {
        User user = mongoTemplate.findOne(Query.query(Criteria.where("username").is(username)), User.class,
                Constants.USER_COLLECTION);

        if (user == null) {
            return new ResponseEntity<>(new UserResponse("Username does not exist", null), HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(new UserResponse("Retrieved user", user), HttpStatus.OK);
    }

    public ResponseEntity<UserResponse> updateUsername(String currUsername, String newUsername) {
        User user = mongoTemplate.findOne(Query.query(Criteria.where("username").is(currUsername)), User.class,
                Constants.USER_COLLECTION);

        if (user == null) {
            return new ResponseEntity<>(new UserResponse("Username does not exist", null), HttpStatus.NOT_FOUND);
        }

        user.setUsername(newUsername);
        mongoTemplate.save(user, Constants.USER_COLLECTION);

        return new ResponseEntity<>(
                new UserResponse("Username updated from " + currUsername + " to " + newUsername, user), HttpStatus.OK);
    }

    public ResponseEntity<UserResponse> deleteUser(String username) {
        User user = mongoTemplate.findOne(Query.query(Criteria.where("username").is(username)), User.class,
                Constants.USER_COLLECTION);

        if (user == null) {
            return new ResponseEntity<>(new UserResponse("Username does not exist", null), HttpStatus.NOT_FOUND);
        }

        mongoTemplate.remove(user, Constants.USER_COLLECTION);

        return new ResponseEntity<>(new UserResponse("User deleted", user), HttpStatus.OK);
    }
}
