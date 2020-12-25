package com.gallery.service;

import java.io.IOException;

import com.gallery.config.MongoConfig;
import com.gallery.constants.Constants;
import com.gallery.core.CreateImageRequest;
import com.gallery.core.UpdateImageDataRequest;
import com.gallery.core.response.GetImageDataResponse;
import com.gallery.core.response.UpdateImageDataResponse;
import com.gallery.core.response.UploadImageResponse;
import com.gallery.model.Image;
import com.google.common.net.HttpHeaders;
import com.mongodb.client.gridfs.GridFSBucket;
import com.mongodb.client.gridfs.model.GridFSFile;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsOperations;
import org.springframework.data.mongodb.gridfs.GridFsResource;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ImageService {
    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private GridFsTemplate gridFsTemplate;

    @Autowired
    private GridFsOperations gridFsOperations;

    @Autowired
    private GridFSBucket gridFsBucket;

    @Autowired
    private MongoConfig mongoConfig;

    // creates gridfs image and fill image document.
    public ResponseEntity<UploadImageResponse> createImage(CreateImageRequest createReq) {
        // store image in gridfs.
        MultipartFile imageFile = createReq.getImageFile();
        ObjectId gridFsImageId = null;
        try {
            gridFsImageId = gridFsTemplate.store(imageFile.getInputStream(), imageFile.getOriginalFilename(),
                    imageFile.getContentType());
        } catch (IOException e) {
            e.printStackTrace();
        }

        // create new object in image repo.
        // store the gridfs id.
        Image image = new Image(gridFsImageId.toString(), createReq.getUserId(), createReq.getTitle(),
                createReq.getDescription());
        image = mongoTemplate.insert(image, Constants.IMAGE_COLLECTION);

        // return the image document.
        return new ResponseEntity<>(new UploadImageResponse("Image uploaded", image), HttpStatus.CREATED);
    }

    // creates gridfs image but empty image document.
    public ResponseEntity<UploadImageResponse> createImage(MultipartFile file) {
        ObjectId gridFsImageId = null;
        try {
            gridFsImageId = gridFsTemplate.store(file.getInputStream(), file.getOriginalFilename(),
                    file.getContentType());
        } catch (IOException e) {
            e.printStackTrace();
        }

        // create new object in image repo.
        // store this gridfs id.
        Image image = new Image(gridFsImageId.toString(), null, null, null);
        image = mongoTemplate.insert(image, Constants.IMAGE_COLLECTION);

        // return the id of object in image repo.
        return new ResponseEntity<>(new UploadImageResponse("Image uploaded", image), HttpStatus.CREATED);
    }

    // updates only data of image.
    public ResponseEntity<?> updateImageData(UpdateImageDataRequest updateReq) {
        String imageId = updateReq.getImageId();

        // check if imageId exists.
        Image image = mongoTemplate.findOne(Query.query(Criteria.where("_id").is(imageId)), Image.class,
                Constants.IMAGE_COLLECTION);
        if (image == null) {
            return new ResponseEntity<>("Image id does not exist.", HttpStatus.BAD_REQUEST);
        }

        // update the data of the image.
        image.setUserId(updateReq.getUserId());
        image.setTitle(updateReq.getTitle());
        image.setDescription(updateReq.getDescription());
        image = mongoTemplate.save(image, Constants.IMAGE_COLLECTION);

        return new ResponseEntity<>(new UpdateImageDataResponse("Image metadata updated.", image), HttpStatus.CREATED);
    }

    // downloads only the image from gridfs.
    public ResponseEntity<?> retrieveImage(String imageId) {
        // check if imageId exists.
        Image image = mongoTemplate.findOne(Query.query(Criteria.where("_id").is(imageId)), Image.class,
                Constants.IMAGE_COLLECTION);
        if (image == null) {
            return new ResponseEntity<>("Image id does not exist.", HttpStatus.BAD_REQUEST);
        }

        String gridFsImageId = image.getGridFsImageId();
        GridFSFile imageFile = gridFsTemplate.findOne(Query.query(Criteria.where("_id").is(gridFsImageId)));

        // if image dont exist.
        if (imageFile == null) {
            return new ResponseEntity<>("GridFS image id does not exist.", HttpStatus.BAD_REQUEST);
        }

        GridFsResource resource = gridFsOperations.getResource(imageFile);
        try {
            return ResponseEntity.ok().contentLength(resource.getGridFSFile().getLength())
                    .contentType(MediaType.parseMediaType(resource.getContentType()))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment:filename=\"" + resource.getFilename() + "\"")
                    .body(resource);
        } catch (IllegalStateException e) {
            e.printStackTrace();
        }
        return null;
    }

    // gets only data of image.
    public ResponseEntity<?> getImageData(String imageId) {
        // check if imageId exists.
        Image image = mongoTemplate.findOne(Query.query(Criteria.where("_id").is(imageId)), Image.class,
                Constants.IMAGE_COLLECTION);
        if (image == null) {
            return new ResponseEntity<>("Image id does not exist.", HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(new GetImageDataResponse("Image metadata received.", image), HttpStatus.CREATED);
    }
}
