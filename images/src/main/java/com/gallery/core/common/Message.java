package com.gallery.core.common;

import java.time.LocalDate;
import java.time.LocalTime;

public class Message {
    private String msg;
    private LocalDate date;
    private LocalTime time;

    public Message(String msg) {
        this.msg = msg;
        this.date = LocalDate.now();
        this.time = LocalTime.now();
    }

    public LocalTime getTime() {
        return this.time;
    }

    public void setTime(LocalTime time) {
        this.time = time;
    }

    public LocalDate getDate() {
        return this.date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
}
