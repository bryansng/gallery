package com.gallery.model;

import java.time.LocalDateTime;
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

  private LocalDateTime creationDate;

  public Annotation() {
  }

  public LocalDateTime getCreationDate() {
    return creationDate;
  }

  public void setCreationDate(LocalDateTime creationDate) {
    this.creationDate = creationDate;
  }

  public Annotation(String annotationId, String userId, String imageId, RectangleCoordinates coordinates,
      String content, LocalDateTime creationDateTime) {
    this.annotationId = annotationId;
    this.userId = userId;
    this.imageId = imageId;
    this.coordinates = coordinates;
    this.content = content;
    this.totalVotes = 0;
    this.UserVoteMap = new HashMap<String, Integer>();
    this.creationDate = creationDateTime;
  }

  public Annotation(String userId, String imageId, RectangleCoordinates coordinates, String content,
      LocalDateTime creationDateTime) {
    this.userId = userId;
    this.imageId = imageId;
    this.coordinates = coordinates;
    this.content = content;
    this.totalVotes = 0;
    this.UserVoteMap = new HashMap<String, Integer>();
    this.creationDate = creationDateTime;
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

  public Map<String, Integer> getAllUserVotes() {
    return this.UserVoteMap;
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
    this.UserVoteMap.remove(userId);
  }

  public void changeVote(String userId, Integer newVote) {
    Integer currVote = this.UserVoteMap.get(userId);
    removeVote(userId, currVote);
    addVote(userId, newVote);
  }

  /**
   * Add, remove, or change votes by
   * Checking if user has existing vote, if not -> add vote
   * Checking if existing vote is  same as new vote -> remove vote
   * Checking if existing vote is !same as new vote -> change votes
   * @param userId
   * @param vote
   * @throws Exception
   */
  public void updateVote(String userId, Integer vote) throws Exception {
    if (voteIsValid(vote))
      throw new Exception("Invalid vote");
    else {
      if (!this.UserVoteMap.containsKey(userId))
        addVote(userId, vote);
      else {
        if (this.UserVoteMap.get(userId).equals(vote))
          removeVote(userId, vote);
        else
          changeVote(userId, vote);
      }
    }
  }

  /**
   * Check if vote is valid (1 or -1 only)
   * @param vote
   * @return boolean
   */
  public Boolean voteIsValid(Integer vote) {
    if (!vote.equals(1) && !vote.equals(-1))
      return true;
    else
      return false;
  }

  public void updateAnnotation(String userId, RectangleCoordinates coordinates, String content) throws Exception {
    if (!this.userId.equals(userId))
      throw new Exception("Invalid user attempting to update annotation.");
    else {
      this.setCoordinates(coordinates);
      this.setContent(content);
    }
  }
}
