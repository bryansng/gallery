package com.gallery.core.response;

import java.io.InputStream;

public class DownloadImageResponse {
    private String msg;
    private InputStream inputStream;

    public DownloadImageResponse(String msg, InputStream inputStream) {
        this.msg = msg;
        this.inputStream = inputStream;
    }

    public String getMsg() {
        return this.msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public InputStream getInputStream() {
        return this.inputStream;
    }

    public void setInputStream(InputStream inputStream) {
        this.inputStream = inputStream;
    }
}
