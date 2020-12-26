package com.gallery.repository;

import com.gallery.model.User;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface SearchUserRepository extends ElasticsearchRepository<User, String> {
}
