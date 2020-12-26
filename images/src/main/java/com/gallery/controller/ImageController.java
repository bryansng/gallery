package com.gallery.controller;

import com.gallery.core.CreateImageRequest;
import com.gallery.core.UpdateImageDataRequest;
import com.gallery.core.response.UploadImageResponse;
import com.gallery.service.ImageService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
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

  @RequestMapping(value = "/{imageId}", method = RequestMethod.POST)
  public ResponseEntity<?> updateImageMetadata(@RequestBody UpdateImageDataRequest updateRequest,
      @PathVariable("imageId") String imageId) {
    return imageService.updateImageData(imageId, updateRequest);
  }

  @RequestMapping(value = "/download/{imageId}", method = RequestMethod.GET)
  public ResponseEntity<?> downloadImage(@PathVariable("imageId") String imageId) {
    return imageService.retrieveImage(imageId);
  }

  @RequestMapping(value = "/{imageId}", method = RequestMethod.GET)
  public ResponseEntity<?> getImageData(@PathVariable("imageId") String imageId) {
    return imageService.getImageData(imageId);
  }

  @RequestMapping(value = "/user/{userId}", method = RequestMethod.GET)
  public ResponseEntity<?> getImagesDataByUserId(@PathVariable("userId") String userId) {
    return imageService.getImagesDataByUserId(userId);
  }

  @RequestMapping(value = "/{imageId}", method = RequestMethod.DELETE)
  public ResponseEntity<?> deleteImage(@PathVariable("imageId") String imageId) {
    return imageService.deleteImage(imageId);
  }
}
