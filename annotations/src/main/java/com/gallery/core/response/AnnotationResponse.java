package com.gallery.core.response;

import com.gallery.model.Annotation;

public class AnnotationResponse {

  private String msg;
  private Annotation annotation;

  public AnnotationResponse(String msg, Annotation annotation) {
    this.msg = msg;
    this.annotation = annotation;
  }

  public String getMsg() {
    return this.msg;
  }

  public void setMsg(String msg) {
    this.msg = msg;
  }

  public Annotation getAnnotation() {
    return this.annotation;
  }

  public void setAnnotation(Annotation annotation) {
    this.annotation = annotation;
  }

}
