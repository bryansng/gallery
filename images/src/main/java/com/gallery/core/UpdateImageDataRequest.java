package com.gallery.core;

public class UpdateImageDataRequest {
  private String title;
  private String description;

  public UpdateImageDataRequest(String title, String description) {
    this.title = title;
    this.description = description;
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
