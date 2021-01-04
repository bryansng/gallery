package com.gallery.core.request;

public class AnnotationVoteRequest {
  private String annotationId;
  private String userId;
  private Integer vote;

  public AnnotationVoteRequest(String annotationId, String userId, Integer vote) {
    this.annotationId = annotationId;
    this.userId = userId;
    this.vote = vote;
  }

  public String getAnnotationId() {
    return this.annotationId;
  }

  public void setAnnotationId(String annotationId) {
    this.annotationId = annotationId;
  }

  public String getUserId() {
    return this.userId;
  }

  public void setUserId(String userId) {
    this.userId = userId;
  }

  public Integer getVote() {
    return this.vote;
  }

  public void setVote(Integer vote) {
    this.vote = vote;
  }

}
