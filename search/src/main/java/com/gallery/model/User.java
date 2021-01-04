package com.gallery.model;

import com.gallery.constants.Constants;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

@Document(indexName = Constants.USER_INDEX_NAME)
public class User {
  @Id
  private String id;
  private String username;

  public User() {
  }

  public User(String id, String username) {
    this.id = id;
    this.username = username;
  }

  public String getId() {
    return this.id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getUsername() {
    return this.username;
  }

  public void setUsername(String username) {
    this.username = username;
  }
}
