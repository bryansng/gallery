package com.gallery.core.request;

import org.springframework.web.multipart.MultipartFile;

public class UploadImageRequest {
  private MultipartFile image;

  public UploadImageRequest() {

  }

  public MultipartFile getImage() {
    return image;
  }

  public void setImage(MultipartFile image) {
    this.image = image;
  }
}
