package com.gallery.core.response;

import com.gallery.core.common.Message;
import com.gallery.model.Image;

public class GetImageDataResponse {
  private Message message;
  private Image image;

  public GetImageDataResponse(String msg, Image image) {
    this.message = new Message(msg);
    this.image = image;
  }

  public Message getMsg() {
    return this.message;
  }

  public void setMsg(Message msg) {
    this.message = msg;
  }

  public Image getImage() {
    return this.image;
  }

  public void setImage(Image image) {
    this.image = image;
  }
}
