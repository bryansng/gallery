package com.gallery.controller;

import com.gallery.core.AnnotationRequest;
import com.gallery.core.response.AnnotationResponse;
import com.gallery.core.response.AnnotationsResponse;
import com.gallery.model.RectangleCoordinates;
import com.gallery.service.AnnotationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.json.JsonParser;
import org.springframework.boot.json.JsonParserFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/annotations")
public class AnnotationController {

  @Autowired
  AnnotationService annotationService;

  JsonParser jsonParser = JsonParserFactory.getJsonParser();

  public AnnotationController() {
  }

  @RequestMapping(value = "/annotations/", method = RequestMethod.POST)
  public ResponseEntity<AnnotationResponse> createAnnotation(@RequestBody AnnotationRequest annotationRequest) {
    return annotationService.createAnnotation(annotationRequest.getAnnotationId(), annotationRequest.getUserId(),
        annotationRequest.getImageId(), annotationRequest.getCoordinates(), annotationRequest.getContent());
  }

  @RequestMapping(value = "/annotations/{annotationId}", method = RequestMethod.GET)
  public ResponseEntity<AnnotationResponse> getAnnotation(@PathVariable("annotationId") String annotationId) {
    return annotationService.getAnnotation(annotationId);
  }

  @RequestMapping(value = "/annotations/", method = RequestMethod.GET)
  public ResponseEntity<AnnotationsResponse> getAnnotations() {
    return annotationService.getAllAnnotations();
  }

  @RequestMapping(value = "/image/{imageId}/annotations", method = RequestMethod.GET)
  public ResponseEntity<AnnotationsResponse> getAllAnnotationsByImageId(@PathVariable("imageId") String imageId) {
    return annotationService.getAllAnnotationsByImageId(imageId);
  }

  @RequestMapping(value = "/annotations/{annotationId}/content", method = RequestMethod.PUT)
  public ResponseEntity<AnnotationResponse> updateAnnotationContent(@PathVariable("annotationId") String annotationId,
      @RequestBody String newAnnotationContent) {
    return annotationService.updateAnnotationContent(annotationId, newAnnotationContent);
  }

  @RequestMapping(value = "/annotations/{annotationId}", method = RequestMethod.DELETE)
  public ResponseEntity<AnnotationResponse> deleteAnnotation(@PathVariable("annotationId") String annotationId) {
    return annotationService.deleteAnnotation(annotationId);
  }

  @RequestMapping(value = "/annotations/{annotationId}/vote", method = RequestMethod.PUT)
  public ResponseEntity<AnnotationResponse> voteAnnotation(@PathVariable("annotationId") String annotationId,
      @RequestBody String userId, @RequestBody Integer vote) {
    return annotationService.voteAnnotation(annotationId, userId, vote);
  }

  @RequestMapping(value = "/annotations/{annotationId}/undo-vote", method = RequestMethod.PUT)
  public ResponseEntity<AnnotationResponse> removeVoteAnnotation(@PathVariable("annotationId") String annotationId,
      @RequestBody String userId, @RequestBody Integer vote) {
    return annotationService.voteAnnotation(annotationId, userId, vote);
  }

  @RequestMapping(value = "/annotations/{annotationId}/coordinates", method = RequestMethod.PUT)
  public ResponseEntity<AnnotationResponse> updateAnnotationCoordinates(
      @PathVariable("annotationId") String annotationId, @RequestBody RectangleCoordinates newCoords) {
    return annotationService.updateCoordinates(annotationId, newCoords);
  }
}
