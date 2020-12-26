package com.gallery.controller;

import com.gallery.core.request.ImageRequest;
import com.gallery.core.response.ObjectResponse;
import com.gallery.core.response.SearchResponse;
import com.gallery.model.User;
import com.gallery.service.SearchService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SearchController {

    @Autowired
    SearchService searchService;

    public SearchController() {
    }

    @RequestMapping(value = "/{keyword}", method = RequestMethod.GET)
    public ResponseEntity<SearchResponse> findByKeyword(@PathVariable("keyword") String keyword) {
        return searchService.findByKeyword(keyword);
    }

    @RequestMapping(value = "/user", method = RequestMethod.POST)
    public ResponseEntity<ObjectResponse> createUser(@RequestBody User user) {
        return searchService.createUser(user);
    }

    @RequestMapping(value = "/user/{userID}", method = RequestMethod.PUT)
    public ResponseEntity<ObjectResponse> updateUsername(@PathVariable("userID") String id, @RequestBody User user) {
        return searchService.updateUsername(user);
    }

    @RequestMapping(value = "/user/{userID}", method = RequestMethod.DELETE)
    public ResponseEntity<ObjectResponse> deleteUser(@PathVariable("userID") String id) {
        return searchService.deleteUser(id);
    }

    @RequestMapping(value = "/image", method = RequestMethod.POST)
    public ResponseEntity<ObjectResponse> createImage(@RequestBody ImageRequest imageRequest) {
        return searchService.createImage(imageRequest);
    }

    @RequestMapping(value = "/image/{imageID}", method = RequestMethod.PUT)
    public ResponseEntity<ObjectResponse> updateImageTitle(@PathVariable("imageID") String id,
            @RequestBody ImageRequest imageRequest) {
        return searchService.updateImage(imageRequest);
    }

    @RequestMapping(value = "/image/{imageID}", method = RequestMethod.DELETE)
    public ResponseEntity<ObjectResponse> deleteImage(@PathVariable("imageID") String id) {
        return searchService.deleteImage(id);
    }
}
