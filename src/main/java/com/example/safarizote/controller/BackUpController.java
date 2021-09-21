package com.example.safarizote.controller;

import org.json.JSONObject;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.Bucket;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.StorageOptions;
import com.google.cloud.ReadChannel; 
import com.google.api.gax.paging.Page;

import com.google.auth.oauth2.GoogleCredentials;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.ArrayList;
import java.io.InputStream;
import java.nio.ByteBuffer;
import java.net.URL;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;

import org.springframework.core.io.Resource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@RestController
public class BackUpController {
    private static final int BUFFER_SIZE = 64 * 1024;
    final Logger logger = LoggerFactory.getLogger(BackUpController.class);
 
  @Value("gs://${gcs-resource-test-bucket}/mail.jpg")
  private Resource gcsFile;
    
  @RequestMapping(value = "/api/listAll",  method={RequestMethod.GET})
  public ResponseEntity<List<JSONObject>> findAll() throws IOException {

      String BUCKET_NAME = "sms_familie_album";
      String PROJECT_ID  = "familiealbum-sms";

      Resource resource = new ClassPathResource("credentials.json");
      GoogleCredentials credentials = GoogleCredentials.fromStream(resource.getInputStream());

      Storage storage = StorageOptions.newBuilder().setProjectId(PROJECT_ID).setCredentials(credentials).build().getService();
      List<String> imageUrls = new ArrayList<>();
      Page<Blob> blobs = storage.list(BUCKET_NAME);
      List<JSONObject> entities = new ArrayList<JSONObject>();
      System.out.println("BackUpController.Start..");
      //https://storage.googleapis.com/${bucket.name}/${blob.name}
      for (Blob blob : blobs.iterateAll()) {
           //System.out.println(blob.getName());
           //imageUrls.add(blob.getName());
           Integer duration = 120;
           URL signedUrl = storage.signUrl(blob, duration, TimeUnit.MINUTES);
           String imageUrl = signedUrl.toExternalForm();
           imageUrls.add(imageUrl);
           JSONObject entity = new JSONObject();
           entity.put("aa", "bb");
           entities.add(entity);
           //logger.info("Generated image url : " + imageUrl);
      }

      /*
      String directoryPrefix = "2017 Olaug";
      Page<Blob> listObjects = storage.list(BUCKET_NAME,
            Storage.BlobListOption.prefix(directoryPrefix),
            Storage.BlobListOption.currentDirectory());

      Iterable<Blob> myBlobs = listObjects.iterateAll();
      for(Blob object : myBlobs) {
            System.out.println(object.getName() + " (" + object.getSize() + " bytes)");
            URL signedUrl = object.signUrl(14, TimeUnit.DAYS);
            System.out.println("BackUpController.signedUrl:= " + signedUrl);
        }
      */
      System.out.println("BackUp.findAll(), the time at the server is now " + new Date());
      System.out.println("BackUp.findAll()  End OK!");
      return new ResponseEntity<>(entities, HttpStatus.OK);
    }    

  @RequestMapping(value = "/api/categories",  method={RequestMethod.GET})
  public ResponseEntity<List<URL>> findCategory() throws IOException {
      System.out.println("findCategory.findAll(), the time at the server is now " + new Date());

      String BUCKET_NAME = "sms_familie_album";
      String PROJECT_ID  = "familiealbum-sms";

      Resource resource = new ClassPathResource("credentials.json");
      GoogleCredentials credentials = GoogleCredentials.fromStream(resource.getInputStream());

      Storage storage = StorageOptions.newBuilder().setProjectId(PROJECT_ID).setCredentials(credentials).build().getService();
      List<URL> imageUrls = new ArrayList<>();
      String directoryPrefix = "2012 MtKenya/";

      Page<Blob> listObjects = storage.list(BUCKET_NAME,
            Storage.BlobListOption.prefix(directoryPrefix),
            Storage.BlobListOption.currentDirectory());
      System.out.println("1.BackUpController.listObjects " + listObjects);

      Iterable<Blob> blobs = listObjects.iterateAll();
      for(Blob blob : blobs) {
        URL signedUrl = blob.signUrl(14, TimeUnit.DAYS);
        imageUrls.add(signedUrl);
      }

      System.out.println("findCategory.findAll(), the time at the server is now " + new Date());
      System.out.println("findCategory.findAll()  End OK!");
      return new ResponseEntity<>(imageUrls, HttpStatus.OK);
    }    

    @RequestMapping(value = "/api/upload", method = RequestMethod.POST)
    public String uploadFile(@RequestParam("file") MultipartFile fileStream ) throws Exception {
        String blobName = fileStream.getName(); 
        System.out.println("BackUpController.upload(), the time at the server is now " + new Date());

        String BUCKET_NAME = "sms_familie_album";
        String PROJECT_ID  = "familiealbum-sms";

        Resource resource = new ClassPathResource("credentials.json");
        GoogleCredentials credentials = GoogleCredentials.fromStream(resource.getInputStream());

        Storage storage = StorageOptions.newBuilder().setProjectId(PROJECT_ID).setCredentials(credentials).build().getService();

        Bucket bucket = storage.get(BUCKET_NAME);
        BlobId blobId = BlobId.of(bucket.getName(), blobName);
        InputStream inputStream = fileStream.getInputStream();
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType("image/jpeg").build();

        Blob blob = storage.createFrom(blobInfo, inputStream);

        System.out.println("BackUpController Image URL : " +  blob.getMediaLink());

        return  blob.getMediaLink();

    }

    @RequestMapping(value = "/api/gcsDownload", method = RequestMethod.GET)
    public ResponseEntity<String> downloadFile(@PathVariable String image ) throws Exception {
        String BUCKET_NAME = "sms_familie_album";
        String PROJECT_ID  = "familiealbum-sms";
        System.out.println("gcsDownload Image URL : " +  image);

        Resource resource = new ClassPathResource("credentials.json");
        GoogleCredentials credentials = GoogleCredentials.fromStream(resource.getInputStream());

        String OBJECT_NAME = "my-object";

        StorageOptions options = StorageOptions.newBuilder()
                    .setProjectId(PROJECT_ID)
                    .setCredentials(credentials).build();

        Storage storage = options.getService();
        Blob blob = storage.get(BUCKET_NAME, OBJECT_NAME);
        ReadChannel r = blob.reader();
        
        ByteBuffer bytes = ByteBuffer.allocate(BUFFER_SIZE);
        while (r.read(bytes) > 0) {
            bytes.flip();
            bytes.clear();
        }

        String fileContent = new String(blob.getContent()); 
        System.out.println(fileContent);

        return new ResponseEntity<>(fileContent, HttpStatus.OK);
    }
}