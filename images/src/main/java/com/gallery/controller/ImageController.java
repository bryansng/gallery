package com.gallery.controller;

import com.gallery.core.CreateImageRequest;
import com.gallery.core.UpdateImageDataRequest;
import com.gallery.core.response.UploadImageResponse;
import com.gallery.service.ImageService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/image")
public class ImageController {
    @Autowired
    ImageService imageService;

    // creates gridfs image but empty image document.
    // @RequestMapping(value = "/upload", method = RequestMethod.POST)
    // public ResponseEntity<UploadImageResponse> uploadImage(@RequestParam("file") MultipartFile file) {
    //     System.out.println(
    //             "Image uploaded: " + file.getOriginalFilename() + " " + file.getContentType() + " " + file.getSize());
    //     return imageService.createImage(file);
    // }

    // creates gridfs image and fill image document.
    @RequestMapping(value = "/upload", method = RequestMethod.POST)
    public ResponseEntity<UploadImageResponse> uploadImage(@ModelAttribute CreateImageRequest createRequest) {
        return imageService.createImage(createRequest);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<?> updateImageMetadata(@RequestBody UpdateImageDataRequest updateRequest) {
        return imageService.updateImageData(updateRequest);
    }

    @RequestMapping(value = "/download", method = RequestMethod.GET)
    public ResponseEntity<?> downloadImage(@RequestParam("imageId") String imageId) {
        return imageService.retrieveImage(imageId);
    }

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<?> getImageData(@RequestParam("imageId") String imageId) {
        return imageService.getImageData(imageId);
    }
}
