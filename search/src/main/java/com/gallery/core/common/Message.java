package com.gallery.core.common;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public class Message {
    private String msg;
    private LocalDateTime localDateTime;
    private LocalDate date;
    private LocalTime time;

    public Message(String msg) {
        this.msg = msg;
        this.setLocalDateTime(LocalDateTime.now());
        this.setDate(localDateTime.toLocalDate());
        this.setTime(localDateTime.toLocalTime());
    }

    public LocalTime getTime() {
        return time;
    }

    public void setTime(LocalTime time) {
        this.time = time;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
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
