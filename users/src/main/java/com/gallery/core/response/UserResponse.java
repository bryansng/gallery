package com.gallery.core.response;

import com.gallery.model.User;

public class UserResponse {

    private String msg;
    private User user;

    public UserResponse(String msg, User user) {
        this.msg = msg;
        this.user = user;
    }

    public String getMsg() {
        return this.msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
