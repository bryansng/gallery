package com.gallery.core.response;

import com.gallery.model.User;

public class SignInResponse extends UserResponse {
  private String token;

  public SignInResponse(String msg, User user, String token) {
    super(msg, user);
    this.token = token;
  }

  public String getToken() {
    return this.token;
  }

  public void setToken(String token) {
    this.token = token;
  }
}
