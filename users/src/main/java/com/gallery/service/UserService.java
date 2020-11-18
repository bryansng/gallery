package com.gallery.service;

import javax.annotation.PostConstruct;

import com.gallery.config.MongoConfig;
import com.gallery.model.User;
import com.gallery.model.UserSequence;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/user")
public class UserService {

    private final String userCollectionName = "user";
    private final String userSequenceCollectionName = "user_sequence";

    @Autowired
    private UserSequenceService userSequenceService;

    @Autowired
    private MongoConfig mongoConfig;

    private MongoTemplate mongoTemplate;

    public UserService() {
    }

    @PostConstruct
    private void init() throws Exception {
        mongoTemplate = mongoConfig.mongoTemplate();
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<String> insert(@RequestBody String username) {
        Long id = userSequenceService.getNext();
        User user = new User(id, username);

        mongoTemplate.save(user, userCollectionName);
        mongoTemplate.insert(new UserSequence(id), userSequenceCollectionName);

        return new ResponseEntity<>("User " + username + " created", HttpStatus.CREATED);
    }

    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<String> update(@RequestParam long id, @RequestBody String username) {
        User user = mongoTemplate.findOne(Query.query(Criteria.where("id").is(id)), User.class);
        user.setUsername(username);
        mongoTemplate.save(user, userCollectionName);

        return new ResponseEntity<>("User " + username + " updated", HttpStatus.OK);
    }
}
