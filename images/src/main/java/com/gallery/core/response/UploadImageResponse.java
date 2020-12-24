package com.gallery.core.response;

import com.gallery.model.Image;

public class UploadImageResponse {
    private String msg;
    private Image image;

    public UploadImageResponse(String msg, Image image) {
        this.msg = msg;
        this.image = image;
    }

    public String getMsg() {
        return this.msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Image getImage() {
        return this.image;
    }

    public void setImage(Image image) {
        this.image = image;
    }
}
