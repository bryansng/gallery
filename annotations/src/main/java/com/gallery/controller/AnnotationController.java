package com.gallery.controller;

import com.gallery.core.request.AnnotationRequest;
import com.gallery.core.request.AnnotationVoteRequest;
import com.gallery.core.response.AnnotationResponse;
import com.gallery.core.response.AnnotationsResponse;
import com.gallery.service.AnnotationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/annotation")
public class AnnotationController {

  @Autowired
  AnnotationService annotationService;

  public AnnotationController() {
  }

  @RequestMapping(method = RequestMethod.POST)
  public ResponseEntity<AnnotationResponse> createAnnotation(@RequestBody AnnotationRequest annotationRequest) {
    return annotationService.createAnnotation(annotationRequest.getUserId(), annotationRequest.getImageId(),
        annotationRequest.getCoordinates(), annotationRequest.getContent());
  }

  @RequestMapping(value = "/{annotationId}", method = RequestMethod.PUT)
  public ResponseEntity<AnnotationResponse> updateAnnotation(@RequestBody AnnotationRequest annotationRequest,
      @PathVariable("annotationId") String annotationId) throws Exception {
    return annotationService.updateAnnotation(annotationId, annotationRequest.getUserId(),
        annotationRequest.getCoordinates(), annotationRequest.getContent());
  }

  @RequestMapping(value = "/vote", method = RequestMethod.PUT)
  public ResponseEntity<AnnotationResponse> voteAnnotation(@RequestBody AnnotationVoteRequest annotationVoteRequest)
      throws Exception {
    return annotationService.voteAnnotation(annotationVoteRequest.getAnnotationId(), annotationVoteRequest.getUserId(),
        annotationVoteRequest.getVote());
  }

  @RequestMapping(value = "/{annotationId}", method = RequestMethod.GET)
  public ResponseEntity<AnnotationResponse> getAnnotation(@PathVariable("annotationId") String annotationId) {
    return annotationService.getAnnotation(annotationId);
  }

  @RequestMapping(method = RequestMethod.GET)
  public ResponseEntity<AnnotationsResponse> getAnnotations() {
    return annotationService.getAllAnnotations();
  }

  @RequestMapping(value = "/image/{imageId}", method = RequestMethod.GET)
  public ResponseEntity<AnnotationsResponse> getAllAnnotationsByImageId(@PathVariable("imageId") String imageId) {
    return annotationService.getAllAnnotationsByImageId(imageId);
  }

  @CrossOrigin(origins = "*")
  @RequestMapping(value = "/user/{userId}", method = RequestMethod.GET)
  public ResponseEntity<AnnotationsResponse> getAllAnnotationsByUserId(@PathVariable("userId") String userId) {
    return annotationService.getAllAnnotationsByUserId(userId);
  }

  @RequestMapping(value = "/{annotationId}", method = RequestMethod.DELETE)
  public ResponseEntity<AnnotationResponse> deleteAnnotation(@PathVariable("annotationId") String annotationId) {
    return annotationService.deleteAnnotation(annotationId);
  }
}
