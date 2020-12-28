package com.gallery.service;

import java.io.IOException;
import java.util.List;

import javax.annotation.PostConstruct;

import com.gallery.config.MongoConfig;
import com.gallery.constants.Constants;
import com.gallery.core.request.CreateImageRequest;
import com.gallery.core.request.UpdateImageDataRequest;
import com.gallery.core.response.GetImageDataResponse;
import com.gallery.core.response.GetImagesDataResponse;
import com.gallery.core.response.UpdateImageDataResponse;
import com.gallery.core.response.UploadImageResponse;
import com.gallery.model.Image;
import com.google.common.net.HttpHeaders;
import com.mongodb.client.gridfs.GridFSBucket;
import com.mongodb.client.gridfs.model.GridFSFile;
import com.netflix.discovery.converters.Auto;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsOperations;
import org.springframework.data.mongodb.gridfs.GridFsResource;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import io.github.cdimascio.dotenv.Dotenv;

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

  private Dotenv dotenv;

  public ImageService() {
  }

  @PostConstruct
  private void init() throws Exception {
    dotenv = Dotenv.configure().directory("../.env").ignoreIfMalformed().ignoreIfMissing().load();
  }

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
        createReq.getDescription(), 0);
    image = mongoTemplate.insert(image, Constants.IMAGE_COLLECTION);

    RestTemplate restTemplate = new RestTemplate();
    HttpEntity<Image> request = new HttpEntity<>(image);
    restTemplate.postForObject(dotenv.get("SEARCH_SERVICE_IMAGE_POST"), request, Object.class);

    // return the image document.
    return new ResponseEntity<>(new UploadImageResponse("Image uploaded successfully", image), HttpStatus.CREATED);
  }

  // creates gridfs image but empty image document.
  // in case we upload image first without any image's data.
  public ResponseEntity<UploadImageResponse> createImage(MultipartFile file) {
    ObjectId gridFsImageId = null;
    try {
      gridFsImageId = gridFsTemplate.store(file.getInputStream(), file.getOriginalFilename(), file.getContentType());
    } catch (IOException e) {
      e.printStackTrace();
    }

    // create new object in image repo.
    // store this gridfs id.
    Image image = new Image(gridFsImageId.toString(), null, null, null, 0);
    image = mongoTemplate.insert(image, Constants.IMAGE_COLLECTION);

    // return the id of object in image repo.
    return new ResponseEntity<>(new UploadImageResponse("Image created successfully", image), HttpStatus.CREATED);
  }

  // updates only data of image.
  public ResponseEntity<?> updateImageData(String imageId, UpdateImageDataRequest updateReq) {
    // check if imageId exists.
    Image image = mongoTemplate.findOne(Query.query(Criteria.where("_id").is(imageId)), Image.class,
        Constants.IMAGE_COLLECTION);
    if (image == null) {
      return new ResponseEntity<>("Image id does not exist.", HttpStatus.BAD_REQUEST);
    }

    // update the data of the image.
    image.setTitle(updateReq.getTitle());
    image.setDescription(updateReq.getDescription());
    image = mongoTemplate.save(image, Constants.IMAGE_COLLECTION);

    RestTemplate restTemplate = new RestTemplate();
    HttpEntity<Image> request = new HttpEntity<>(image);
    restTemplate.exchange(dotenv.get("SEARCH_SERVICE_IMAGE_UPDATE") + image.getId(), HttpMethod.PUT, request,
        Object.class);

    return new ResponseEntity<>(new UpdateImageDataResponse("Image data updated successfully.", image),
        HttpStatus.CREATED);
  }

  public ResponseEntity<?> incrementImageTotalViews(String imageId) {
    // check if imageId exists.
    Image image = mongoTemplate.findOne(Query.query(Criteria.where("_id").is(imageId)), Image.class,
        Constants.IMAGE_COLLECTION);
    if (image == null) {
      return new ResponseEntity<>("Image id does not exist.", HttpStatus.BAD_REQUEST);
    }

    // update the data of the image.
    image.incrementViewsBy(1);
    image = mongoTemplate.save(image, Constants.IMAGE_COLLECTION);

    return new ResponseEntity<>(new UpdateImageDataResponse("Incremented image total views successfully.", image),
        HttpStatus.CREATED);
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
    return new ResponseEntity<>("Error retrieving image from gridFsOperations.", HttpStatus.BAD_REQUEST);
  }

  // gets only data of image.
  public ResponseEntity<?> getImageData(String imageId) {
    // check if imageId exists.
    Image image = mongoTemplate.findOne(Query.query(Criteria.where("_id").is(imageId)), Image.class,
        Constants.IMAGE_COLLECTION);
    if (image == null) {
      return new ResponseEntity<>("Image id does not exist.", HttpStatus.BAD_REQUEST);
    }

    return new ResponseEntity<>(new GetImageDataResponse("Image data received successfully.", image),
        HttpStatus.CREATED);
  }

  // gets only data of image.
  public ResponseEntity<?> getImagesDataByUserId(String userId) {
    // check if imageId exists.
    List<Image> image = mongoTemplate.find(Query.query(Criteria.where("userId").is(userId)), Image.class,
        Constants.IMAGE_COLLECTION);
    if (image == null) {
      return new ResponseEntity<>("Image id does not exist.", HttpStatus.BAD_REQUEST);
    }

    return new ResponseEntity<>(new GetImagesDataResponse("Images data received successfully.", image),
        HttpStatus.CREATED);
  }

  public ResponseEntity<?> deleteImage(String imageId) {
    // check if imageId exists.
    Image image = mongoTemplate.findOne(Query.query(Criteria.where("_id").is(imageId)), Image.class,
        Constants.IMAGE_COLLECTION);
    if (image == null) {
      return new ResponseEntity<>("Image id does not exist.", HttpStatus.BAD_REQUEST);
    }

    gridFsOperations.delete(Query.query(Criteria.where("_id").is(image.getGridFsImageId())));
    mongoTemplate.remove(image, Constants.IMAGE_COLLECTION);

    RestTemplate restTemplate = new RestTemplate();
    HttpEntity<String> request = new HttpEntity<>(image.getId());
    restTemplate.delete(dotenv.get("SEARCH_SERVICE_IMAGE_DELETE") + image.getId(), request);

    return new ResponseEntity<>(new GetImageDataResponse("Image deleted successfully.", image), HttpStatus.CREATED);
  }
}
