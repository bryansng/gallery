package com.gallery.model;

import java.util.HashMap;
import java.util.Map;

import com.gallery.constants.Constants;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = Constants.ANNOTATION_COLLECTION)
public class Annotation {
  @Id
  private String annotationId;

  private String userId;

  private String imageId;

  private RectangleCoordinates coordinates;

  private String content;

  private Integer totalVotes;

  private Map<String, Integer> UserVoteMap;

  public Annotation() {
  }

  public Annotation(String annotationId, String userId, String imageId, RectangleCoordinates coordinates,
      String content) {
    this.annotationId = annotationId;
    this.userId = userId;
    this.imageId = imageId;
    this.coordinates = coordinates;
    this.content = content;
    this.totalVotes = 0;
    this.UserVoteMap = new HashMap<String, Integer>();
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

  public String getImageId() {
    return this.imageId;
  }

  public void setImageId(String imageId) {
    this.imageId = imageId;
  }

  public RectangleCoordinates getRectangleCoordinates() {
    return this.coordinates;
  }

  public void setCoordinates(RectangleCoordinates coordinates) {
    this.coordinates = coordinates;
  }

  public String getContent() {
    return this.content;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public Integer getTotalVotesFromMap() {
    Integer totalVotes = 0;
    for (Integer vote : this.UserVoteMap.values())
      totalVotes += vote;
    return totalVotes;
  }

  public Integer getTotalVotes() {
    return this.totalVotes;
  }

  public void addVote(String userId, Integer vote) {
    this.totalVotes += vote;
    this.UserVoteMap.put(userId, vote);
  }

  public void removeVote(String userId, Integer vote) {
    this.totalVotes -= vote;
    this.UserVoteMap.remove(userId, vote);
  }
}
