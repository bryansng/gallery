package com.gallery.core.common;

import java.time.LocalDateTime;

public class Message {
    private String msg;
    private LocalDateTime localDateTime;

    public Message(String msg) {
        this.msg = msg;
        this.setLocalDateTime(LocalDateTime.now());
    }

    public LocalDateTime getLocalDateTime() {
        return localDateTime;
    }

    public void setLocalDateTime(LocalDateTime localDateTime) {
        this.localDateTime = localDateTime;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}
