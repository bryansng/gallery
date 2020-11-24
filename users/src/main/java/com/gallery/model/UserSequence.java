package com.gallery.model;

import com.gallery.constants.Constants;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = Constants.USER_SEQUENCE_COLLECTION)
public class UserSequence {

    @Id
    private String id;

    private long seq;

    public UserSequence() {
    }

    public UserSequence(long seq) {
        this.seq = seq;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public long getSeq() {
        return seq;
    }

    public void setSeq(long seq) {
        this.seq = seq;
    }
}