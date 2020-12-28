package com.gallery.core.response;

import com.gallery.core.common.Message;

public class SearchResponse {

    private Message message;
    private UserSearchResponse userResponse;
    private ImageSearchResponse imageResponse;

    public SearchResponse(String msg, UserSearchResponse userResponse, ImageSearchResponse imageResponse) {
        this.message = new Message(msg);
        this.setUserResponse(userResponse);
        this.setImageResponse(imageResponse);
    }

    public ImageSearchResponse getImageResponse() {
        return imageResponse;
    }

    public void setImageResponse(ImageSearchResponse imageResponse) {
        this.imageResponse = imageResponse;
    }

    public UserSearchResponse getUserResponse() {
        return userResponse;
    }

    public void setUserResponse(UserSearchResponse userResponse) {
        this.userResponse = userResponse;
    }

    public Message getMsg() {
        return this.message;
    }

    public void setMsg(Message msg) {
        this.message = msg;
    }
}
