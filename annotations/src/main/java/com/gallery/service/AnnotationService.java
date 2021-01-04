package com.gallery.service;

import java.time.LocalDateTime;
import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.data.domain.Sort;
import com.gallery.config.MongoConfig;
import com.gallery.constants.Constants;
import com.gallery.core.request.AnnotationRequest;
import com.gallery.core.request.AnnotationVoteRequest;
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

  @Autowired
  private AnnotationService annotationService;

  @Autowired
  private MongoConfig mongoConfig;

  private MongoTemplate mongoTemplate;

  public AnnotationService() {
  }

  @PostConstruct
  private void init() throws Exception {
    mongoTemplate = mongoConfig.mongoTemplate();

    annotationService.createAnnotation("5ff343a210087b312eb12341",
        new AnnotationRequest("5ff33a44322c9d1b7f7220d6", "5fe931051897c026c1591826",
            "reminds me of Industrial Society and Its Future",
            new RectangleCoordinates(53.970588235294116, 1.7857142857142856, 97.6470588235294, 23.035714285714285)));
    annotationService.createAnnotation("5ff343a210087b312eb12342",
        new AnnotationRequest("5ff33a44322c9d1b7f7220d5", "5fe931051897c026c1591826", "monke",
            new RectangleCoordinates(33.52941176470588, 89.82142857142857, 57.647058823529406, 97.67857142857143)));

    annotationService.createAnnotation("5ff343a210087b312eb12343",
        new AnnotationRequest("5ff33a44322c9d1b7f7220d7", "5fe931051897c026c1591829", "sales over tho",
            new RectangleCoordinates(33.33333333333333, 5.764966740576496, 94.25837320574163, 68.95787139689578)));

    annotationService.createAnnotation("5ff343a210087b312eb12344",
        new AnnotationRequest("5ff33a44322c9d1b7f7220d6", "5fe931051897c026c1591831", "🌸",
            new RectangleCoordinates(75.14792899408283, 38.36589698046181, 86.58777120315581, 47.42451154529307)));

    annotationService.createAnnotation("5ff343a210087b312eb12345",
        new AnnotationRequest("5ff33a44322c9d1b7f7220d5", "5fe931051897c026c1591830", "wear a jacket bruh",
            new RectangleCoordinates(5.871886120996441, 22.597864768683273, 95.90747330960853, 95.19572953736655)));

    annotationService.createAnnotation("5ff343a210087b312eb12346",
        new AnnotationRequest("5ff33a44322c9d1b7f7220d6", "5fe931051897c026c1591832", "fjgkakfdjlghaj",
            new RectangleCoordinates(48.616600790513836, 30.2491103202847, 96.44268774703558, 59.9644128113879)));
    annotationService.createAnnotation("5ff343a210087b312eb12347",
        new AnnotationRequest("5ff33a44322c9d1b7f7220d6", "5fe931051897c026c1591832", "should we make links work",
            new RectangleCoordinates(20.51282051282051, 90.94138543516874, 44.97041420118343, 92.89520426287744)));

    annotationService.createAnnotation("5ff343a210087b312eb12348",
        new AnnotationRequest("5ff33a44322c9d1b7f7220d6", "5fe931051897c026c1591825", "lmaooooooooooo",
            new RectangleCoordinates(21.195652173913043, 37.65541740674956, 89.85507246376811, 79.75133214920072)));
    annotationService.createAnnotation("5ff343a210087b312eb12349",
        new AnnotationRequest("5ff33a44322c9d1b7f7220d7", "5fe931051897c026c1591825", "nice",
            new RectangleCoordinates(21.195652173913043, 4.6263345195729535, 80.43478260869566, 17.437722419928825)));

    annotationService.createAnnotation("5ff343a210087b312eb12351",
        new AnnotationRequest("5ff33a44322c9d1b7f7220d6", "5fe931051897c026c1591828", "https://ismarchoveryet.com/",
            new RectangleCoordinates(15.555555555555555, 23.51851851851852, 89.30555555555556, 54.074074074074076)));
    annotationService.createAnnotation("5ff343a210087b312eb12350",
        new AnnotationRequest("5ff33a44322c9d1b7f7220d7", "5fe931051897c026c1591828", "stan bts",
            new RectangleCoordinates(38.91547049441787, 24.46808510638298, 88.03827751196172, 53.404255319148945)));

    annotationService.createAnnotation("5ff343a210087b312eb12353",
        new AnnotationRequest("5ff33a44322c9d1b7f7220d7", "5fe931051897c026c1591827", "Omelette du fromage",
            new RectangleCoordinates(93.5361216730038, 73.66548042704626, 5.7034220532319395, 3.3807829181494666)));
    String newLine = System.getProperty("line.separator");
    annotationService.createAnnotation("5ff343a210087b312eb12352",
        new AnnotationRequest("5ff33a44322c9d1b7f7220d5", "5fe931051897c026c1591827", String.join(newLine,
            "Start by cracking 4 eggs into a large bowl. Remove any shell remains from the bowl. Season with a pinch of salt and a splash of whole milk. Beat together.",
            "In a large nonstick skillet, melt 2 tablespoons of unsalted butter. Once melted and foamy, dump in the eggs and move the eggs around a bit using a fork (nonmetal).",
            "Place 3 slices of American singles on one side of the omelette. Once the curds begin to solidify, fold the other half onto the cheese.",
            "Let cook a little longer until a little brown on the outside. Place on a plate and season with kosher salt and freshly ground black pepper.",
            "https://www.bingingwithbabish.com/recipes/omelette-du-fromage-dexters-laboratory"),
            new RectangleCoordinates(47.52851711026616, 43.238434163701065, 82.50950570342205, 67.08185053380782)));

    annotationService.createAnnotation("5ff343a210087b312eb12354",
        new AnnotationRequest("5ff33a44322c9d1b7f7220d6", "5fe931051897c026c1591835",
            "aight happy holidays y'all https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            new RectangleCoordinates(25.0, 25.0, 90.625, 84.375)));

    annotationService
        .voteAnnotation(new AnnotationVoteRequest("5ff343a210087b312eb12341", "5ff33a44322c9d1b7f7220d5", -1));
    annotationService
        .voteAnnotation(new AnnotationVoteRequest("5ff343a210087b312eb12341", "5ff33a44322c9d1b7f7220d7", 1));

    annotationService
        .voteAnnotation(new AnnotationVoteRequest("5ff343a210087b312eb12342", "5ff33a44322c9d1b7f7220d7", 1));

    annotationService
        .voteAnnotation(new AnnotationVoteRequest("5ff343a210087b312eb12343", "5ff33a44322c9d1b7f7220d6", -1));

    annotationService
        .voteAnnotation(new AnnotationVoteRequest("5ff343a210087b312eb12344", "5ff33a44322c9d1b7f7220d6", -1));

    annotationService
        .voteAnnotation(new AnnotationVoteRequest("5ff343a210087b312eb12347", "5ff33a44322c9d1b7f7220d5", -1));

    annotationService
        .voteAnnotation(new AnnotationVoteRequest("5ff343a210087b312eb12350", "5ff33a44322c9d1b7f7220d6", -1));
    annotationService
        .voteAnnotation(new AnnotationVoteRequest("5ff343a210087b312eb12351", "5ff33a44322c9d1b7f7220d7", -1));
    annotationService
        .voteAnnotation(new AnnotationVoteRequest("5ff343a210087b312eb12351", "5ff33a44322c9d1b7f7220d5", -1));

    annotationService
        .voteAnnotation(new AnnotationVoteRequest("5ff343a210087b312eb12352", "5ff33a44322c9d1b7f7220d6", 1));
    annotationService
        .voteAnnotation(new AnnotationVoteRequest("5ff343a210087b312eb12352", "5ff33a44322c9d1b7f7220d5", 1));

    annotationService
        .voteAnnotation(new AnnotationVoteRequest("5ff343a210087b312eb12354", "5ff33a44322c9d1b7f7220d5", 1));
  }

  public ResponseEntity<AnnotationResponse> createAnnotation(String specificAnnotationId,
      AnnotationRequest annotationRequest) {
    Annotation annotation;
    if (specificAnnotationId == null) {
      annotation = new Annotation(annotationRequest.getUserId(), annotationRequest.getImageId(),
          annotationRequest.getCoordinates(), annotationRequest.getContent(), LocalDateTime.now());
    } else {
      annotation = new Annotation(specificAnnotationId, annotationRequest.getUserId(), annotationRequest.getImageId(),
          annotationRequest.getCoordinates(), annotationRequest.getContent(), LocalDateTime.now());
    }
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

  public ResponseEntity<AnnotationsResponse> getAllAnnotationsByUserId(String userId) {
    List<Annotation> annotations = mongoTemplate.find(Query.query(Criteria.where("userId").is(userId)),
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

  public ResponseEntity<AnnotationsResponse> getRecentAnnotations(int numberOfAnnotations) {
    Query query = new Query();
    query.limit(numberOfAnnotations);
    query.with(Sort.by(Sort.Direction.DESC, "creationDate"));
    List<Annotation> annotations = mongoTemplate.find(query, Annotation.class, Constants.ANNOTATION_COLLECTION);

    if (annotations == null) {
      return new ResponseEntity<>(new AnnotationsResponse("Annotations does not exist", null), HttpStatus.NOT_FOUND);
    }

    return new ResponseEntity<>(new AnnotationsResponse("Retrieved annotations", annotations), HttpStatus.OK);
  }

  public ResponseEntity<AnnotationResponse> updateAnnotation(String annotationId, AnnotationRequest annotationRequest)
      throws Exception {
    Annotation annotation = mongoTemplate.findOne(Query.query(Criteria.where("annotationId").is(annotationId)),
        Annotation.class, Constants.ANNOTATION_COLLECTION);

    if (annotation == null) {
      return new ResponseEntity<>(new AnnotationResponse("Annotation does not exist", null), HttpStatus.NOT_FOUND);
    }

    annotation.updateAnnotation(annotationRequest.getUserId(), annotationRequest.getCoordinates(),
        annotationRequest.getContent());
    mongoTemplate.save(annotation, Constants.ANNOTATION_COLLECTION);

    return new ResponseEntity<>(new AnnotationResponse("Annotation updated", annotation), HttpStatus.OK);
  }

  public ResponseEntity<AnnotationResponse> voteAnnotation(AnnotationVoteRequest annotationVoteRequest)
      throws Exception {
    Annotation annotation = mongoTemplate.findOne(
        Query.query(Criteria.where("annotationId").is(annotationVoteRequest.getAnnotationId())), Annotation.class,
        Constants.ANNOTATION_COLLECTION);

    if (annotation == null) {
      return new ResponseEntity<>(new AnnotationResponse("Annotation does not exist", null), HttpStatus.NOT_FOUND);
    }

    annotation.updateVote(annotationVoteRequest.getUserId(), annotationVoteRequest.getVote());
    mongoTemplate.save(annotation, Constants.ANNOTATION_COLLECTION);

    return new ResponseEntity<>(new AnnotationResponse("Annotation vote updated", annotation), HttpStatus.OK);
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
}
