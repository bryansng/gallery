package com.gallery.config;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.gridfs.GridFSBucket;
import com.mongodb.client.gridfs.GridFSBuckets;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoClientConfiguration;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.convert.MappingMongoConverter;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;

@Configuration
public class MongoConfig extends AbstractMongoClientConfiguration {
    @Autowired
    private MappingMongoConverter mongoConverter;

    @Bean
    public GridFsTemplate gridFsTemplate() throws Exception {
        return new GridFsTemplate(mongoDbFactory(), mongoConverter);
    }

    private final String dbName = "images";

    @Bean
    public MongoClient mongoClient() {
        ConnectionString connectionString = new ConnectionString("mongodb://images-mongodb:27017/" + dbName);
        MongoClientSettings mongoClientSettings = MongoClientSettings.builder().applyConnectionString(connectionString)
                .build();

        return MongoClients.create(mongoClientSettings);
    }

    @Bean
    public MongoTemplate mongoTemplate() throws Exception {
        return new MongoTemplate(mongoClient(), dbName);
    }

    //GridFSBucket to open download stream
    @Bean
    public GridFSBucket gridFSBucket() {
        MongoDatabase mongoDatabase = mongoClient().getDatabase(dbName);
        GridFSBucket bucket = GridFSBuckets.create(mongoDatabase);
        return bucket;
    }

    @Override
    protected String getDatabaseName() {
        return dbName;
    }
}
