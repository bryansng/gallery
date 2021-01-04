package com.gallery.service;

import static org.elasticsearch.index.query.QueryBuilders.matchQuery;
import static org.elasticsearch.index.query.QueryBuilders.regexpQuery;

import java.time.LocalDateTime;

import javax.annotation.PostConstruct;

import com.gallery.config.Config;
import com.gallery.constants.Constants;
import com.gallery.core.request.ImageRequest;
import com.gallery.core.response.ImageSearchResponse;
import com.gallery.core.response.ObjectResponse;
import com.gallery.core.response.SearchResponse;
import com.gallery.core.response.UserSearchResponse;
import com.gallery.model.Image;
import com.gallery.model.User;
import com.gallery.repository.SearchImageRepository;
import com.gallery.repository.SearchUserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.mapping.IndexCoordinates;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.data.elasticsearch.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class SearchService {

  @Autowired
  SearchImageRepository searchImageRepository;

  @Autowired
  SearchUserRepository searchUserRepository;

  @Autowired
  Config config;

  // @Autowired
  // SearchService searchService;

  private ElasticsearchOperations elasticSearchTemplate;

  public SearchService() {
  }

  @PostConstruct
  private void init() throws Exception {
    elasticSearchTemplate = config.elasticsearchTemplate();
    // searchService.createUser(new User("1", "bryan"));
  }

  /**
   * Search in Elasticsearch
   *
   * @param keyword
   * @return
   */
  public ResponseEntity<SearchResponse> findByKeyword(String keyword) {
    Query searchQuery = new NativeSearchQueryBuilder().withFilter(regexpQuery("username", ".*" + keyword + ".*"))
        .build();
    SearchHits<User> usersByUsername;
    try {
      usersByUsername = elasticSearchTemplate.search(searchQuery, User.class,
          IndexCoordinates.of(Constants.USER_INDEX_NAME));
    } catch (Exception e) {
      usersByUsername = null;
      System.out.println("No indexes found for usersByUsername.");
    }

    searchQuery = new NativeSearchQueryBuilder().withFilter(regexpQuery("title", ".*" + keyword + ".*")).build();
    SearchHits<Image> imagesByTitle;
    try {
      imagesByTitle = elasticSearchTemplate.search(searchQuery, Image.class,
          IndexCoordinates.of(Constants.IMAGE_INDEX_NAME));
    } catch (Exception e) {
      imagesByTitle = null;
      System.out.println("No indexes found for imagesByTitle.");
    }

    searchQuery = new NativeSearchQueryBuilder().withFilter(regexpQuery("description", ".*" + keyword + ".*")).build();
    SearchHits<Image> imagesByDescription;
    try {
      imagesByDescription = elasticSearchTemplate.search(searchQuery, Image.class,
          IndexCoordinates.of(Constants.IMAGE_INDEX_NAME));
    } catch (Exception e) {
      imagesByDescription = null;
      System.out.println("No indexes found for imagesByDescription.");
    }

    return new ResponseEntity<>(new SearchResponse("Search completed", new UserSearchResponse(usersByUsername),
        new ImageSearchResponse(imagesByTitle, imagesByDescription)), HttpStatus.OK);
  }

  /**
   * Create user
   *
   * @param userRequest
   * @return
   */
  public ResponseEntity<ObjectResponse> createUser(User user) {
    elasticSearchTemplate.save(user);
    return new ResponseEntity<>(new ObjectResponse("User created", user), HttpStatus.CREATED);
  }

  /**
   * Update user
   *
   * @param userRequest
   * @return
   */
  public ResponseEntity<ObjectResponse> updateUsername(String currUsername, User user) {
    Query searchQuery = new NativeSearchQueryBuilder()
        .withQuery(matchQuery("username", currUsername).minimumShouldMatch("100%")).build();

    SearchHits<User> users = elasticSearchTemplate.search(searchQuery, User.class,
        IndexCoordinates.of(Constants.USER_INDEX_NAME));
    User updatedUser = users.getSearchHit(0).getContent();

    updatedUser.setUsername(user.getUsername());
    elasticSearchTemplate.save(updatedUser);

    return new ResponseEntity<>(new ObjectResponse("User updated", updatedUser), HttpStatus.OK);
  }

  /**
   * Delete user
   *
   * @param id
   * @return
   */
  public ResponseEntity<ObjectResponse> deleteUser(String id) {
    Query searchQuery = new NativeSearchQueryBuilder().withQuery(matchQuery("id", id).minimumShouldMatch("100%"))
        .build();

    SearchHits<User> users = elasticSearchTemplate.search(searchQuery, User.class,
        IndexCoordinates.of(Constants.USER_INDEX_NAME));
    User user = users.getSearchHit(0).getContent();

    elasticSearchTemplate.delete(id, User.class);

    return new ResponseEntity<>(new ObjectResponse("User deleted", user), HttpStatus.OK);
  }

  /**
   * Create image
   *
   * @param imageRequest
   * @return
   */
  public ResponseEntity<ObjectResponse> createImage(Image image) {
    elasticSearchTemplate.save(image);

    return new ResponseEntity<>(new ObjectResponse("Image created", image), HttpStatus.CREATED);
  }

  /**
   * Update image
   *
   * @param imageRequest
   * @return
   */
  public ResponseEntity<ObjectResponse> updateImage(ImageRequest imageRequest) {
    Query searchQuery = new NativeSearchQueryBuilder()
        .withQuery(matchQuery("id", imageRequest.getId()).minimumShouldMatch("100%")).build();

    SearchHits<Image> images = elasticSearchTemplate.search(searchQuery, Image.class,
        IndexCoordinates.of(Constants.IMAGE_INDEX_NAME));
    Image image = images.getSearchHit(0).getContent();

    image.setTitle(imageRequest.getTitle());
    image.setDescription(imageRequest.getDescription());
    elasticSearchTemplate.save(image);

    return new ResponseEntity<>(new ObjectResponse("Image updated", image), HttpStatus.OK);
  }

  /**
   * Delete image
   *
   * @param id
   * @return
   */
  public ResponseEntity<ObjectResponse> deleteImage(String id) {
    Query searchQuery = new NativeSearchQueryBuilder().withQuery(matchQuery("id", id).minimumShouldMatch("100%"))
        .build();

    SearchHits<Image> images = elasticSearchTemplate.search(searchQuery, Image.class,
        IndexCoordinates.of(Constants.IMAGE_INDEX_NAME));
    Image image = images.getSearchHit(0).getContent();

    elasticSearchTemplate.delete(id, Image.class);

    return new ResponseEntity<>(new ObjectResponse("Image deleted", image), HttpStatus.OK);
  }
}
