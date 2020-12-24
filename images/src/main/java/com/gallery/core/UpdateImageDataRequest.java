package com.gallery.core;

public class UpdateImageDataRequest {
  private String imageId;
  private String userId;
  private String title;
  private String description;

  public UpdateImageDataRequest(String imageId, String userId, String title, String description) {
    this.imageId = imageId;
    this.userId = userId;
    this.title = title;
    this.description = description;
  }

  public String getImageId() {
    return this.imageId;
  }

  public void setImageId(String imageId) {
    this.imageId = imageId;
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
}
