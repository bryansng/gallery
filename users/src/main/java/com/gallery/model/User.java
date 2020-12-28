package com.gallery.model;

import java.time.LocalDateTime;

import com.gallery.constants.Constants;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.IndexDirection;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * @author Braddy Yeoh - 17357376
 */

/**
 * User object
 */
@Document(collection = Constants.USER_COLLECTION)
public class User {
  @Id
  private String id;

  @Indexed(direction = IndexDirection.ASCENDING)
  private String username;

  private LocalDateTime creationDate;

  public User() {
  }

  public User(String username, LocalDateTime createDateTime) {
    this.username = username;
    this.creationDate = createDateTime;
  }

  public LocalDateTime getCreationDate() {
    return creationDate;
  }

  public void setCreationDate(LocalDateTime creationDate) {
    this.creationDate = creationDate;
  }

  public String getUsername() {
    return this.username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getId() {
    return this.id;
  }

  public void setId(String id) {
    this.id = id;
  }
}
