package com.example.safarizote.controller;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.nio.ByteBuffer;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

import com.example.safarizote.model.DaoObject;
import com.google.api.gax.paging.Page;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.ReadChannel;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Bucket;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class BackUpController {
    private static final int BUFFER_SIZE = 64 * 1024;
    final Logger logger = LoggerFactory.getLogger(BackUpController.class);
 
  @Value("gs://${gcs-resource-test-bucket}/mail.jpg")
  private Resource gcsFile;
    
  @GetMapping("/api/listAll")
  public ResponseEntity<List<DaoObject>> findAll() throws IOException {

      String BUCKET_NAME = "sms_familie_album";
      String PROJECT_ID  = "familiealbum-sms";

      Resource resource = new ClassPathResource("credentials.json");
      GoogleCredentials credentials = GoogleCredentials.fromStream(resource.getInputStream());

      Storage storage = StorageOptions.newBuilder().setProjectId(PROJECT_ID).setCredentials(credentials).build().getService();
      Page<Blob> blobs = storage.list(BUCKET_NAME);
      List<DaoObject> map = new ArrayList<>();

      Integer duration = 120;

      //https://storage.googleapis.com/${bucket.name}/${blob.name}
      for (Blob blob : blobs.iterateAll()) {
           URL signedUrl = storage.signUrl(blob, duration, TimeUnit.MINUTES);
           String imageUrl = signedUrl.toExternalForm();
           DaoObject obj = new DaoObject(blob.getName(), imageUrl);
           map.add(obj);
      }

      return ResponseEntity.ok().body(map);

    }    

  @GetMapping("/api/categories")
  public ResponseEntity<List<DaoObject>> findCategory() throws IOException {
      String BUCKET_NAME = "sms_familie_album";
      String PROJECT_ID  = "familiealbum-sms";

      Resource resource = new ClassPathResource("credentials.json");
      GoogleCredentials credentials = GoogleCredentials.fromStream(resource.getInputStream());

      Storage storage = StorageOptions.newBuilder().setProjectId(PROJECT_ID).setCredentials(credentials).build().getService();
      //List<URL> imageUrls = new ArrayList<>();
      String directoryPrefix = "2012 MtKenya/";

      Page<Blob> listObjects = storage.list(BUCKET_NAME,
            Storage.BlobListOption.prefix(directoryPrefix),
            Storage.BlobListOption.currentDirectory());

      List<DaoObject> imageUrls = new ArrayList<>();
      Iterable<Blob> blobs = listObjects.iterateAll();
      for(Blob blob : blobs) {
        URL signedUrl = blob.signUrl(14, TimeUnit.DAYS);
        String imageUrl = signedUrl.toExternalForm();
        
        DaoObject obj = new DaoObject(blob.getName(), imageUrl);
        imageUrls.add(obj);
      }

      return ResponseEntity.ok().body(imageUrls);
    }    

    @PostMapping("/api/upload")
    public String uploadFile(@RequestParam("file") MultipartFile fileStream ) throws Exception {
        String blobName = fileStream.getName(); 

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
        return  blob.getMediaLink();

    }

    @GetMapping("/api/gcsDownload")
    public ResponseEntity<String> downloadFile(@PathVariable String image ) throws Exception {
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
        
        ByteBuffer bytes = ByteBuffer.allocate(BUFFER_SIZE);
        while (r.read(bytes) > 0) {
            bytes.flip();
            bytes.clear();
        }

        String fileContent = new String(blob.getContent()); 

        return ResponseEntity.ok().body(fileContent);
    }
}