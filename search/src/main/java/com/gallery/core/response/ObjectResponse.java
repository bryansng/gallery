package com.gallery.core.response;

import com.gallery.core.common.Message;

public class ObjectResponse {

    private Message message;
    private Object obj;

    public ObjectResponse(String msg, Object obj) {
        this.message = new Message(msg);
        this.obj = obj;
    }

    public Message getMsg() {
        return this.message;
    }

    public void setMsg(Message msg) {
        this.message = msg;
    }

    public Object getUser() {
        return this.obj;
    }

    public void setUser(Object obj) {
        this.obj = obj;
    }
}
