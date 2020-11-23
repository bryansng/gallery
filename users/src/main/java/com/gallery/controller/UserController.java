package com.gallery.controller;

import com.gallery.core.UserRequest;
import com.gallery.core.response.UserResponse;
import com.gallery.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/user")
public class UserController {

    @Autowired
    UserService userService;

    public UserController() {
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<UserResponse> createUser(@RequestBody UserRequest userRequest) {
        return userService.createUser(userRequest.getUsername());
    }

    @RequestMapping(value = "/{username}", method = RequestMethod.GET)
    public ResponseEntity<UserResponse> getUser(@PathVariable("username") String username) {
        return userService.getUser(username);
    }

    @RequestMapping(value = "/{username}", method = RequestMethod.PUT)
    public ResponseEntity<UserResponse> updateUsername(@PathVariable("username") String currUsername,
            @RequestBody String newUsername) {
        return userService.updateUsername(currUsername, newUsername);
    }

    @RequestMapping(value = "/{username}", method = RequestMethod.DELETE)
    public ResponseEntity<UserResponse> deleteUser(@PathVariable("username") String username) {
        return userService.deleteUser(username);
    }
}
