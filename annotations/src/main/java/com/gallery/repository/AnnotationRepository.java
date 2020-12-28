package com.gallery.repository;

import com.gallery.model.Annotation;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnnotationRepository extends MongoRepository<Annotation, String> {

}