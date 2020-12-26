package com.gallery.core.response;

public class SearchResponse {

    private String msg;
    private UserSearchResponse userResponse;
    private ImageSearchResponse imageResponse;

    public SearchResponse(String msg, UserSearchResponse userResponse, ImageSearchResponse imageResponse) {
        this.msg = msg;
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

    public String getMsg() {
        return this.msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}
