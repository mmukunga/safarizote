package com.example.safarizote.controller;

import com.google.cloud.storage.Storage;
import com.google.cloud.storage.Bucket;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.StorageOptions;
import com.google.cloud.ReadChannel; 

import com.google.auth.oauth2.GoogleCredentials;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Date;
import java.io.InputStream;
import java.nio.ByteBuffer;
import java.nio.channels.Channels;

import org.springframework.core.io.Resource;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.io.BufferedReader;

@RestController
class BackUpController {
    private static final int BUFFER_SIZE = 64 * 1024;

    @RequestMapping(value = "/api/upload", method = RequestMethod.POST)
    public String uploadFile(@RequestParam("file") MultipartFile fileStream ) throws Exception {
        //File filePath = fileStream.; 
        String blobName = fileStream.getName(); 
        //File uploadCreds;
        System.out.println("BackUp.findAll(), the time at the server is now " + new Date());

        String BUCKET_NAME = "sms_familie_album";
        String PROJECT_ID  = "familiealbum-sms";

        Resource resource = new ClassPathResource("credentials.json");
        GoogleCredentials credentials = GoogleCredentials.fromStream(resource.getInputStream());

        // Get specific file from specified bucket
        Storage storage = StorageOptions.newBuilder().setProjectId(PROJECT_ID).setCredentials(credentials).build().getService();

        //String bucketName = "bucketName"; 
        Bucket bucket = storage.get(BUCKET_NAME);
        BlobId blobId = BlobId.of(bucket.getName(), blobName);
        InputStream inputStream = fileStream.getInputStream();
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType("image/jpeg").build();

        Blob blob = storage.createFrom(blobInfo, inputStream);

        System.out.println("Image URL : " +  blob.getMediaLink());

        return  blob.getMediaLink();

    }

    @RequestMapping(value = "/api/download", method = RequestMethod.GET)
    public ResponseEntity<String> downloadFile(@PathVariable String fileName ) throws Exception {
        String BUCKET_NAME = "sms_familie_album";
        String PROJECT_ID  = "familiealbum-sms";
        
        Resource resource = new ClassPathResource("credentials.json");
        GoogleCredentials credentials = GoogleCredentials.fromStream(resource.getInputStream());

        String OBJECT_NAME = "my-object";

        StorageOptions options = StorageOptions.newBuilder()
                    .setProjectId(PROJECT_ID)
                    .setCredentials(credentials).build();

        Storage storage = options.getService();
        Blob blob = storage.get(BUCKET_NAME, OBJECT_NAME);
        ReadChannel r = blob.reader();

        BufferedReader br = new BufferedReader(Channels.newReader(r,"UTF-8"));
        
        ByteBuffer bytes = ByteBuffer.allocate(BUFFER_SIZE);
        while (r.read(bytes) > 0) {
            bytes.flip();
            // do something with bytes
            bytes.clear();
        }

        String fileContent = new String(blob.getContent()); 
        System.out.println(fileContent);

        return new ResponseEntity<>(fileContent, HttpStatus.OK);
    }

}