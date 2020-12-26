package com.gallery.repository;

import com.gallery.model.Image;

import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface SearchImageRepository extends ElasticsearchRepository<Image, String> {
}
