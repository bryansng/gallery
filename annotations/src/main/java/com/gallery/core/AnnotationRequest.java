package com.gallery.core;

import com.gallery.model.RectangleCoordinates;

public class AnnotationRequest {
  private String userId;
  private String imageId;
  private String content;
  private RectangleCoordinates coordinates;
  private Integer vote;

  public AnnotationRequest() {

  }

  public String getUserId() {
    return this.userId;
  }

  public void setUserId(String userId) {
    this.userId = userId;
  }

  public String getImageId() {
    return this.imageId;
  }

  public void setImageId(String imageId) {
    this.imageId = imageId;
  }

  public String getContent() {
    return this.content;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public RectangleCoordinates getCoordinates() {
    return this.coordinates;
  }

  public void setCoordinates(RectangleCoordinates coordinates) {
    this.coordinates = coordinates;
  }

  public Integer getVote() {
    return this.vote;
  }

  public void setVote(Integer vote) {
    this.vote = vote;
  }
}
