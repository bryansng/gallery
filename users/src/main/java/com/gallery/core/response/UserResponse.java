package com.gallery.core.response;

import com.gallery.core.common.Message;
import com.gallery.model.User;

public class UserResponse {

    private Message message;
    private User user;

    public UserResponse(String msg, User user) {
        this.message = new Message(msg);
        this.user = user;
    }

    public Message getMsg() {
        return this.message;
    }

    public void setMsg(Message msg) {
        this.message = msg;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
