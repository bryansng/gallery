package com.gallery.model;

import com.gallery.constants.Constants;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = Constants.IMAGE_COLLECTION)
public class Image {
    @Id
    private String id;

    private String gridFsImageId;
    private String userId;
    private String title;
    private String description;

    public Image(String gridFsImageId, String userId, String title, String description) {
        this.gridFsImageId = gridFsImageId;
        this.userId = userId;
        this.title = title;
        this.description = description;
    }

    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getGridFsImageId() {
        return this.gridFsImageId;
    }

    public void setGridFsImageId(String gridFsImageId) {
        this.gridFsImageId = gridFsImageId;
    }

    public String getUserId() {
        return this.userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
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
}
