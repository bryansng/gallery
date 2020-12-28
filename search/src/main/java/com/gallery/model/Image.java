package com.gallery.model;

import java.time.LocalDateTime;

import com.gallery.constants.Constants;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;

@Document(indexName = Constants.IMAGE_INDEX_NAME, type = Constants.IMAGE_INDEX_NAME)
public class Image {
    @Id
    private String id;
    private String title;
    private String description;
    private LocalDateTime creationDate;

    public Image() {
        creationDate = LocalDateTime.now();
    }

    public Image(String id, String title, String description) {
        this.id = id;
        this.title = title;
        this.description = description;
        creationDate = LocalDateTime.now();
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDateTime creationDate) {
        this.creationDate = creationDate;
    }
}
