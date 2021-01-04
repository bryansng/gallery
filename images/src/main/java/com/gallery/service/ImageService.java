package com.gallery.service;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
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
import org.springframework.core.env.Environment;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.data.domain.Sort;
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
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
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

  @Autowired
  private ImageService imageService;

  @Autowired
  private Environment env;

  @Autowired
  private ResourceLoader resourceLoader;

  public ImageService() {
  }

  @PostConstruct
  private void init() throws Exception {
    Resource resource;
    InputStream stream;
    MultipartFile multipartFile;

    // System.out.println(
    //     "Does resource exist?: " + resource.exists() + "; " + resource.getURL() + "; " + resource.getFilename());
    try {
      resource = resourceLoader.getResource("classpath:/initial-images/dexter.png");
      stream = resource.getInputStream();
      multipartFile = new MockMultipartFile(resource.getFilename(), resource.getFilename(), MediaType.IMAGE_PNG_VALUE,
          stream);
      imageService.createImage("5fe931051897c026c1591827",
          new CreateImageRequest(multipartFile, "5ff33a44322c9d1b7f7220d7", "dexter", "placeholder"));

      resource = resourceLoader.getResource("classpath:/initial-images/honey_honey_i_loaded_your_gun_with_blanks.jpg");
      stream = resource.getInputStream();
      multipartFile = new MockMultipartFile(resource.getFilename(), resource.getFilename(), MediaType.IMAGE_JPEG_VALUE,
          stream);
      imageService.createImage("5fe931051897c026c1591831", new CreateImageRequest(multipartFile,
          "5ff33a44322c9d1b7f7220d5", "honey, honey. i loaded your gun with blanks",
          "https://twitter.com/carrotsprout_/status/1345529439837278209/photo/1 https://clips.twitch.tv/PowerfulAntsyBibimbapRiPepperonis"));

      resource = resourceLoader.getResource("classpath:/initial-images/trust_exercise.jpg");
      stream = resource.getInputStream();
      multipartFile = new MockMultipartFile(resource.getFilename(), resource.getFilename(), MediaType.IMAGE_JPEG_VALUE,
          stream);
      imageService.createImage("5fe931051897c026c1591832", new CreateImageRequest(multipartFile,
          "5ff33a44322c9d1b7f7220d5", "trust exercise",
          "https://twitter.com/carrotsprout_/status/1345529439837278209/photo/1 https://clips.twitch.tv/PowerfulAntsyBibimbapRiPepperonis"));

      resource = resourceLoader.getResource("classpath:/initial-images/asphodel_crossing.jpg");
      stream = resource.getInputStream();
      multipartFile = new MockMultipartFile(resource.getFilename(), resource.getFilename(), MediaType.IMAGE_JPEG_VALUE,
          stream);
      imageService.createImage("5fe931051897c026c1591829",
          new CreateImageRequest(multipartFile, "5ff33a44322c9d1b7f7220d6", "asphodel crossing",
              "reposted from @Hvnart https://twitter.com/Hvnnart/status/1343141983045316608"));

      resource = resourceLoader.getResource("classpath:/initial-images/202ne1.jpg");
      stream = resource.getInputStream();
      multipartFile = new MockMultipartFile(resource.getFilename(), resource.getFilename(), MediaType.IMAGE_JPEG_VALUE,
          stream);
      imageService.createImage("5fe931051897c026c1591828", new CreateImageRequest(multipartFile,
          "5ff33a44322c9d1b7f7220d6", "202ne1", "happy new year! or march 3000th"));

      resource = resourceLoader.getResource("classpath:/initial-images/culture.webp");
      stream = resource.getInputStream();
      multipartFile = new MockMultipartFile(resource.getFilename(), resource.getFilename(), MediaType.IMAGE_JPEG_VALUE,
          stream);
      imageService.createImage("5fe931051897c026c1591826", new CreateImageRequest(multipartFile,
          "5ff33a44322c9d1b7f7220d7", "culture", "Reject Humanity     Return to Monke"));

      resource = resourceLoader.getResource("classpath:/initial-images/cat.jpg");
      stream = resource.getInputStream();
      multipartFile = new MockMultipartFile(resource.getFilename(), resource.getFilename(), MediaType.IMAGE_JPEG_VALUE,
          stream);
      imageService.createImage("5fe931051897c026c1591830",
          new CreateImageRequest(multipartFile, "5ff33a44322c9d1b7f7220d6",
              "Cat politely declines being removed from blanket pile",
              "cat https://www.youtube.com/watch?v=Oyx3xkdi4uw"));

      resource = resourceLoader.getResource("classpath:/initial-images/stick_bug.gif");
      stream = resource.getInputStream();
      multipartFile = new MockMultipartFile(resource.getFilename(), resource.getFilename(), MediaType.IMAGE_GIF_VALUE,
          stream);
      imageService.createImage("5fe931051897c026c1591825",
          new CreateImageRequest(multipartFile, "5ff33a44322c9d1b7f7220d5", "get stick bugged lol",
              "hehe https://knowyourmeme.com/memes/get-stick-bugged-lol"));

      resource = resourceLoader.getResource("classpath:/initial-images/owo.gif");
      stream = resource.getInputStream();
      multipartFile = new MockMultipartFile(resource.getFilename(), resource.getFilename(), MediaType.IMAGE_GIF_VALUE,
          stream);
      imageService.createImage("5fe931051897c026c1591835",
          new CreateImageRequest(multipartFile, "5ff33a44322c9d1b7f7220d6", "owo", "what's this"));
    } catch (Exception e) {
      e.printStackTrace();
      System.out.println("Unable to manually create image.");
    }
  }

  // creates gridfs image and fill image document.
  public ResponseEntity<UploadImageResponse> createImage(String specificImageId, CreateImageRequest createReq) {
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
    Image image;
    if (specificImageId == null) {
      image = new Image(gridFsImageId.toString(), createReq.getUserId(), createReq.getTitle(),
          createReq.getDescription(), 0, LocalDateTime.now());
    } else {
      image = new Image(specificImageId, gridFsImageId.toString(), createReq.getUserId(), createReq.getTitle(),
          createReq.getDescription(), 0, LocalDateTime.now());
    }
    image = mongoTemplate.insert(image, Constants.IMAGE_COLLECTION);

    RestTemplate restTemplate = new RestTemplate();
    HttpEntity<Image> request = new HttpEntity<>(image);
    restTemplate.postForObject(env.getProperty("SEARCH_SERVICE_IMAGE_POST"), request, Object.class);

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
    Image image = new Image(gridFsImageId.toString(), null, null, null, 0, LocalDateTime.now());
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
    restTemplate.exchange(env.getProperty("SEARCH_SERVICE_IMAGE_UPDATE") + image.getId(), HttpMethod.PUT, request,
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

  public ResponseEntity<?> getRecentImageData(int numOfImages) {
    Query query = new Query();
    query.limit(numOfImages);
    query.with(Sort.by(Sort.Direction.DESC, "creationDate"));
    List<Image> image = mongoTemplate.find(query, Image.class, Constants.IMAGE_COLLECTION);
    if (image == null) {
      return new ResponseEntity<>("Image id does not exist.", HttpStatus.BAD_REQUEST);
    }

    return new ResponseEntity<>(new GetImagesDataResponse("Image data received successfully.", image),
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
    restTemplate.delete(env.getProperty("SEARCH_SERVICE_IMAGE_DELETE") + image.getId(), request);

    return new ResponseEntity<>(new GetImageDataResponse("Image deleted successfully.", image), HttpStatus.CREATED);
  }
}
