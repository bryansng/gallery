package com.gallery.repository;

import com.gallery.model.UserSequence;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserSequenceRepository extends MongoRepository<UserSequence, String> {
    UserSequence findTopByOrderByIdDesc();
}
