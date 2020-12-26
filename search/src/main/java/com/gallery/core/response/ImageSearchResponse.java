package com.gallery.core.response;

import com.gallery.model.Image;

import org.springframework.data.elasticsearch.core.SearchHits;

public class ImageSearchResponse {

    private SearchHits<Image> imagesByTitle;
    private SearchHits<Image> imagesByDescription;

    public ImageSearchResponse(SearchHits<Image> imagesByTitle, SearchHits<Image> imagesByDescription) {
        this.imagesByTitle = imagesByTitle;
        this.imagesByDescription = imagesByDescription;
    }

    public SearchHits<Image> getImagesByTitle() {
        return this.imagesByTitle;
    }

    public void setImagesByTitlePage(SearchHits<Image> imagesByTitle) {
        this.imagesByTitle = imagesByTitle;
    }

    public SearchHits<Image> getImagesByDescription() {
        return this.imagesByDescription;
    }

    public void setImagesByDescription(SearchHits<Image> imagesByDescription) {
        this.imagesByDescription = imagesByDescription;
    }
}
