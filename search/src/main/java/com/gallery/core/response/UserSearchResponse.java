package com.gallery.core.response;

import com.gallery.model.User;

import org.springframework.data.elasticsearch.core.SearchHits;

public class UserSearchResponse {

    private SearchHits<User> users;

    public UserSearchResponse(SearchHits<User> users) {
        this.users = users;
    }

    public SearchHits<User> getUsers() {
        return this.users;
    }

    public void setUsersByUsername(SearchHits<User> users) {
        this.users = users;
    }
}
