package com.gallery.core.response;

import com.gallery.model.User;

public class RegisterResponse extends SignInResponse {
  public RegisterResponse(String msg, User user, String token) {
    super(msg, user, token);
  }
}
