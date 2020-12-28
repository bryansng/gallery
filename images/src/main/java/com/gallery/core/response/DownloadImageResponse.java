package com.gallery.core.response;

import java.io.InputStream;

import com.gallery.core.common.Message;

public class DownloadImageResponse {
    private Message message;
    private InputStream inputStream;

    public DownloadImageResponse(String msg, InputStream inputStream) {
        this.message = new Message(msg);
        this.inputStream = inputStream;
    }

    public Message getMsg() {
        return this.message;
    }

    public void setMsg(Message message) {
        this.message = message;
    }

    public InputStream getInputStream() {
        return this.inputStream;
    }

    public void setInputStream(InputStream inputStream) {
        this.inputStream = inputStream;
    }
}
