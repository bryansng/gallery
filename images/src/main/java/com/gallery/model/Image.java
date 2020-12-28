package com.gallery.model;

import java.time.LocalDateTime;

import com.gallery.constants.Constants;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = Constants.IMAGE_COLLECTION)
public class Image {
  @Id
  private String id;

  private String gridFsImageId;
  private String userId;
  private String title;
  private String description;
  private Integer totalViews;
  private LocalDateTime creationDate;

  public Image() {
  }

  public Image(String gridFsImageId, String userId, String title, String description, Integer totalViews,
      LocalDateTime creationDateTime) {
    this.gridFsImageId = gridFsImageId;
    this.userId = userId;
    this.title = title;
    this.description = description;
    this.totalViews = totalViews;
    this.creationDate = creationDateTime;
  }

  public LocalDateTime getCreationDate() {
    return creationDate;
  }

  public void setCreationDate(LocalDateTime creationDate) {
    this.creationDate = creationDate;
  }

  public String getId() {
    return this.id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getGridFsImageId() {
    return this.gridFsImageId;
  }

  public void setGridFsImageId(String gridFsImageId) {
    this.gridFsImageId = gridFsImageId;
  }

  public String getUserId() {
    return this.userId;
  }

  public void setUserId(String userId) {
    this.userId = userId;
  }

  public String getTitle() {
    return this.title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public String getDescription() {
    return this.description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public Integer getTotalViews() {
    return this.totalViews;
  }

  public void setTotalViews(Integer totalViews) {
    this.totalViews = totalViews;
  }

  public void incrementViewsBy(Integer totalNewViews) {
    this.totalViews += totalNewViews;
  }
}
