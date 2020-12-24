package com.gallery.core.response;

import java.util.List;
import com.gallery.model.Annotation;

public class AnnotationsResponse {
  private List<Annotation> annotations;
  private String msg;

  public AnnotationsResponse(String msg, List<Annotation> annotations) {
    this.msg = msg;
    this.annotations = annotations;
  }

  public String getMsg() {
    return this.msg;
  }

  public void setMsg(String msg) {
    this.msg = msg;
  }

  public List<Annotation> getAnnotations() {
    return this.annotations;
  }

  public void setAnnotations(List<Annotation> annotations) {
    this.annotations = annotations;
  }
}
