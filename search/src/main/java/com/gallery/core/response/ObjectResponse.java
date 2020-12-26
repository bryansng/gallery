package com.gallery.core.response;

public class ObjectResponse {

    private String msg;
    private Object obj;

    public ObjectResponse(String msg, Object obj) {
        this.msg = msg;
        this.obj = obj;
    }

    public String getMsg() {
        return this.msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Object getUser() {
        return this.obj;
    }

    public void setUser(Object obj) {
        this.obj = obj;
    }
}
