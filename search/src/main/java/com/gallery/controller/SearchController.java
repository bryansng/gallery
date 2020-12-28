package com.gallery.controller;

import com.gallery.core.request.ImageRequest;
import com.gallery.core.response.ObjectResponse;
import com.gallery.core.response.SearchResponse;
import com.gallery.model.Image;
import com.gallery.model.User;
import com.gallery.service.SearchService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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

    /**
     * Search user and images by keyword
     *
     * @param keyword
     * @return
     */
    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/{keyword}", method = RequestMethod.GET)
    public ResponseEntity<SearchResponse> findByKeyword(@PathVariable("keyword") String keyword) {
        System.out.println("Searching for: " + keyword);
        return searchService.findByKeyword(keyword);
    }

    /**
     * Post a new user
     *
     * @param user
     * @return
     */
    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/user", method = RequestMethod.POST)
    public ResponseEntity<ObjectResponse> createUser(@RequestBody User user) {
        return searchService.createUser(user);
    }

    /**
     * Update a user
     *
     * @param id
     * @param user
     * @return
     */
    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/user/{userID}", method = RequestMethod.PUT)
    public ResponseEntity<ObjectResponse> updateUsername(@PathVariable("userID") String id, @RequestBody User user) {
        return searchService.updateUsername(user);
    }

    /**
     * Delete a user
     *
     * @param id
     * @return
     */
    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/user/{userID}", method = RequestMethod.DELETE)
    public ResponseEntity<ObjectResponse> deleteUser(@PathVariable("userID") String id) {
        return searchService.deleteUser(id);
    }

    /**
     * Post a new image
     *
     * @param imageRequest
     * @return
     */
    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/image", method = RequestMethod.POST)
    public ResponseEntity<ObjectResponse> createImage(@RequestBody Image image) {
        return searchService.createImage(image);
    }

    /**
     * Update an image
     *
     * @param id
     * @param imageRequest
     * @return
     */
    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/image/{imageID}", method = RequestMethod.PUT)
    public ResponseEntity<ObjectResponse> updateImageTitle(@PathVariable("imageID") String id,
            @RequestBody ImageRequest imageRequest) {
        return searchService.updateImage(imageRequest);
    }

    /**
     * Delete an image
     *
     * @param id
     * @return
     */
    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/image/{imageID}", method = RequestMethod.DELETE)
    public ResponseEntity<ObjectResponse> deleteImage(@PathVariable("imageID") String id) {
        return searchService.deleteImage(id);
    }
}
