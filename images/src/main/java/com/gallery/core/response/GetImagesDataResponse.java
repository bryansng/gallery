package com.gallery.core.response;

import java.util.List;

import com.gallery.core.common.Message;
import com.gallery.model.Image;

public class GetImagesDataResponse {
  private Message message;
  private List<Image> images;

  public GetImagesDataResponse(String msg, List<Image> images) {
    this.message = new Message(msg);
    this.images = images;
  }

  public Message getMsg() {
    return this.message;
  }

  public void setMsg(Message msg) {
    this.message = msg;
  }

  public List<Image> getImages() {
    return this.images;
  }

  public void setImages(List<Image> images) {
    this.images = images;
  }
}
