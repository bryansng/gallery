package com.gallery.core.request;

import org.springframework.web.multipart.MultipartFile;

public class CreateImageRequest {
  private MultipartFile imageFile;
  private String userId;
  private String title;
  private String description;

  public CreateImageRequest(MultipartFile imageFile, String userId, String title, String description) {
    this.imageFile = imageFile;
    this.userId = userId;
    this.title = title;
    this.description = description;
  }

  public MultipartFile getImageFile() {
    return this.imageFile;
  }

  public void setImageFile(MultipartFile imageFile) {
    this.imageFile = imageFile;
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
