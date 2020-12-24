package com.gallery.service;

import java.util.List;

import javax.annotation.PostConstruct;

import com.gallery.config.MongoConfig;
import com.gallery.constants.Constants;
import com.gallery.core.response.AnnotationResponse;
import com.gallery.core.response.AnnotationsResponse;
import com.gallery.model.Annotation;
import com.gallery.model.RectangleCoordinates;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class AnnotationService {
  private MongoTemplate mongoTemplate;
  @Autowired
  private MongoConfig mongoConfig;

  public AnnotationService() {

  }

  @PostConstruct
  private void init() throws Exception {
    mongoTemplate = mongoConfig.mongoTemplate();
  }

  public ResponseEntity<AnnotationResponse> createAnnotation(String annotationId, String userId, String imageId,
      RectangleCoordinates coordinates, String content) {
    boolean annotationExists = mongoTemplate.exists(Query.query(Criteria.where("annotationId").is(annotationId)),
        Annotation.class, Constants.ANNOTATION_COLLECTION);

    if (annotationExists) {
      return new ResponseEntity<>(new AnnotationResponse("Annotation already exists", null), HttpStatus.BAD_REQUEST);
    }

    Annotation annotation = new Annotation(annotationId, userId, imageId, coordinates, content);

    mongoTemplate.insert(annotation, Constants.ANNOTATION_COLLECTION);

    return new ResponseEntity<>(new AnnotationResponse("Annotation created", annotation), HttpStatus.CREATED);
  }

  public ResponseEntity<AnnotationResponse> getAnnotation(String annotationId) {
    Annotation annotation = mongoTemplate.findOne(Query.query(Criteria.where("annotationId").is(annotationId)),
        Annotation.class, Constants.ANNOTATION_COLLECTION);

    if (annotation == null) {
      return new ResponseEntity<>(new AnnotationResponse("Annotation does not exist", null), HttpStatus.NOT_FOUND);
    }

    return new ResponseEntity<>(new AnnotationResponse("Retrieved annotation", annotation), HttpStatus.OK);
  }

  public ResponseEntity<AnnotationsResponse> getAllAnnotationsByImageId(String imageId) {
    List<Annotation> annotations = mongoTemplate.find(Query.query(Criteria.where("imageId").is(imageId)),
        Annotation.class, Constants.ANNOTATION_COLLECTION);

    if (annotations == null) {
      return new ResponseEntity<>(new AnnotationsResponse("Annotations does not exist", null), HttpStatus.NOT_FOUND);
    }

    return new ResponseEntity<>(new AnnotationsResponse("Retrieved annotation", annotations), HttpStatus.OK);
  }

  public ResponseEntity<AnnotationsResponse> getAllAnnotations() {
    List<Annotation> annotations = mongoTemplate.findAll(Annotation.class, Constants.ANNOTATION_COLLECTION);

    if (annotations == null) {
      return new ResponseEntity<>(new AnnotationsResponse("Annotations does not exist", null), HttpStatus.NOT_FOUND);
    }

    return new ResponseEntity<>(new AnnotationsResponse("Retrieved annotations", annotations), HttpStatus.OK);
  }

  public ResponseEntity<AnnotationResponse> updateAnnotationContent(String annotationId, String newContent) {
    Annotation annotation = mongoTemplate.findOne(Query.query(Criteria.where("annotationId").is(annotationId)),
        Annotation.class, Constants.ANNOTATION_COLLECTION);

    if (annotation == null) {
      return new ResponseEntity<>(new AnnotationResponse("Annotation does not exist", null), HttpStatus.NOT_FOUND);
    }

    String currentContent = annotation.getContent();

    annotation.setContent(newContent);
    mongoTemplate.save(annotation, Constants.ANNOTATION_COLLECTION);

    return new ResponseEntity<>(
        new AnnotationResponse("Annotation content updated from " + currentContent + " to " + newContent, annotation),
        HttpStatus.OK);
  }

  public ResponseEntity<AnnotationResponse> deleteAnnotation(String annotationId) {
    Annotation annotation = mongoTemplate.findOne(Query.query(Criteria.where("annotationId").is(annotationId)),
        Annotation.class, Constants.ANNOTATION_COLLECTION);

    if (annotation == null) {
      return new ResponseEntity<>(new AnnotationResponse("Annotation does not exist", null), HttpStatus.NOT_FOUND);
    }

    mongoTemplate.remove(annotation, Constants.ANNOTATION_COLLECTION);

    return new ResponseEntity<>(new AnnotationResponse("Annotation deleted", annotation), HttpStatus.OK);
  }

  public ResponseEntity<AnnotationResponse> voteAnnotation(String annotationId, String userId, Integer vote) {
    Annotation annotation = mongoTemplate.findOne(Query.query(Criteria.where("annotationId").is(annotationId)),
        Annotation.class, Constants.ANNOTATION_COLLECTION);
    if (annotation == null) {
      return new ResponseEntity<>(new AnnotationResponse("Annotation does not exist", null), HttpStatus.NOT_FOUND);
    }

    annotation.addVote(userId, vote);
    mongoTemplate.save(annotation, Constants.ANNOTATION_COLLECTION);
    return new ResponseEntity<>(new AnnotationResponse("Added vote to annotation", annotation), HttpStatus.OK);
  }

  public ResponseEntity<AnnotationResponse> removeVoteAnnotation(String annotationId, String userId, Integer vote) {
    Annotation annotation = mongoTemplate.findOne(Query.query(Criteria.where("annotationId").is(annotationId)),
        Annotation.class, Constants.ANNOTATION_COLLECTION);
    if (annotation == null) {
      return new ResponseEntity<>(new AnnotationResponse("Annotation does not exist", null), HttpStatus.NOT_FOUND);
    }

    annotation.removeVote(userId, vote);
    mongoTemplate.save(annotation, Constants.ANNOTATION_COLLECTION);
    return new ResponseEntity<>(new AnnotationResponse("Removed vote from annotation", annotation), HttpStatus.OK);
  }

  public ResponseEntity<AnnotationResponse> updateCoordinates(String annotationId, RectangleCoordinates newCoords) {
    Annotation annotation = mongoTemplate.findOne(Query.query(Criteria.where("annotationId").is(annotationId)),
        Annotation.class, Constants.ANNOTATION_COLLECTION);

    if (annotation == null) {
      return new ResponseEntity<>(new AnnotationResponse("Annotation does not exist", null), HttpStatus.NOT_FOUND);
    }

    RectangleCoordinates currCoords = annotation.getRectangleCoordinates();

    annotation.setCoordinates(newCoords);
    mongoTemplate.save(annotation, Constants.ANNOTATION_COLLECTION);

    return new ResponseEntity<>(
        new AnnotationResponse("Annotation coordinates updated from " + currCoords + " to " + newCoords, annotation),
        HttpStatus.OK);
  }
}
