package com.gallery.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.index.IndexDirection;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * @author Braddy Yeoh - 17357376
 */

/**
 * User object
 */
@Document(collection = "user")
public class User {

    @Transient
    public static final String SEQUENCE_NAME = "user_id";

    @Id
    private Long id;

    @Indexed(direction = IndexDirection.ASCENDING)
    private String username;

    public User() {

    }

    public User(Long id, String username) {
        this.id = id;
        this.username = username;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
