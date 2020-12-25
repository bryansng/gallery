package com.gallery.core.response;

import java.util.List;

import com.gallery.model.Image;

public class GetImagesDataResponse {
  private String msg;
  private List<Image> images;

  public GetImagesDataResponse(String msg, List<Image> images) {
    this.msg = msg;
    this.images = images;
  }

  public String getMsg() {
    return this.msg;
  }

  public void setMsg(String msg) {
    this.msg = msg;
  }

  public List<Image> getImages() {
    return this.images;
  }

  public void setImages(List<Image> images) {
    this.images = images;
  }
}
