package com.gallery.model;

import java.time.LocalDateTime;

import com.gallery.constants.Constants;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

@Document(indexName = Constants.USER_INDEX_NAME, type = Constants.USER_INDEX_NAME)
public class User {
    @Id
    private String id;
    private String username;
    private LocalDateTime creationDate;

    public User() {
        creationDate = LocalDateTime.now();
    }

    public LocalDateTime getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDateTime creationDate) {
        this.creationDate = creationDate;
    }

    public User(String id, String username) {
        this.id = id;
        this.username = username;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
