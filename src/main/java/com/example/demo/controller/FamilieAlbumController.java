package com.example.demo.controller;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.nio.ByteBuffer;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

import com.example.demo.model.DaoObject;
import com.example.demo.model.FamilieAlbum;
import com.example.demo.repository.FamilieAlbumRepository;
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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.HttpHeaders;

@RestController
public class FamilieAlbumController {
  @Autowired
  private FamilieAlbumRepository repository;

  private static final int BUFFER_SIZE = 64 * 1024;
  final Logger logger = LoggerFactory.getLogger(FamilieAlbumController.class);

  @Value("gs://${gcs-resource-test-bucket}/mail.jpg")
  private Resource gcsFile;
  
  @GetMapping("/api/folders")
	public ResponseEntity<List<FamilieAlbum>> getFolders() {
		List<FamilieAlbum> folders = repository.findAll();
		HttpHeaders headers = new HttpHeaders();
		headers.add("Responded", "FamilieAlbumsController");
		return new ResponseEntity<>(folders, headers, HttpStatus.OK);
	}

  @GetMapping("/api/listAll")
  public ResponseEntity<List<DaoObject>> findAll() throws IOException {
    String BUCKET_NAME = "sms_familie_album";
    String PROJECT_ID = "familiealbum-sms";
    Resource resource = new ClassPathResource("credentials.json");
    GoogleCredentials credentials = GoogleCredentials.fromStream(resource.getInputStream());
   
    Storage storage = StorageOptions.newBuilder().setProjectId(PROJECT_ID).setCredentials(credentials).build()
        .getService();
    Page<Blob> blobs = storage.list(BUCKET_NAME);
    List<DaoObject> map = new ArrayList<>();
    Integer duration = 120;
    // https://storage.googleapis.com/${bucket.name}/${blob.name}
    int COUNTER = 0;
    for (Blob blob : blobs.iterateAll()) {
      while(COUNTER < 100) {
        URL signedUrl = storage.signUrl(blob, duration, TimeUnit.MINUTES);
        String imageUrl = signedUrl.toExternalForm();
        DaoObject obj = new DaoObject(blob.getName(), imageUrl);
        map.add(obj);
        COUNTER = COUNTER + 1;
      }
      
    }
    return ResponseEntity.ok().body(map);
  }

  @GetMapping("/api/categories")
  public ResponseEntity<List<DaoObject>> findCategory(@RequestParam String folder) throws IOException {
    String BUCKET_NAME = "sms_familie_album";
    String PROJECT_ID = "familiealbum-sms";
    Resource resource = new ClassPathResource("credentials.json");
    GoogleCredentials credentials = GoogleCredentials.fromStream(resource.getInputStream());
    Storage storage = StorageOptions.newBuilder().setProjectId(PROJECT_ID).setCredentials(credentials).build()
        .getService();
    StringBuilder sb = new StringBuilder();
      sb.append(folder);
      sb.append("/");
    String directoryPrefix = sb.toString();
    Page<Blob> listObjects = storage.list(BUCKET_NAME,
        Storage.BlobListOption.prefix(directoryPrefix),
        Storage.BlobListOption.currentDirectory());
    List<DaoObject> imageUrls = new ArrayList<>();
    Iterable<Blob> blobs = listObjects.iterateAll();
    for (Blob blob : blobs) {
      URL signedUrl = blob.signUrl(14, TimeUnit.DAYS);
      String imageUrl = signedUrl.toExternalForm();
      DaoObject obj = new DaoObject(blob.getName(), imageUrl);
      imageUrls.add(obj);
    }
    System.out.println("findCategory - End OK! " + new Date());
    return ResponseEntity.ok().body(imageUrls);
  }

  @PostMapping("/api/upload")
  public String uploadFile(@RequestParam("file") MultipartFile fileStream) throws Exception {
    String blobName = fileStream.getName();
    String BUCKET_NAME = "sms_familie_album";
    String PROJECT_ID = "familiealbum-sms";

    Resource resource = new ClassPathResource("credentials.json");
    GoogleCredentials credentials = GoogleCredentials.fromStream(resource.getInputStream());

    Storage storage = StorageOptions.newBuilder().setProjectId(PROJECT_ID).setCredentials(credentials).build()
        .getService();

    Bucket bucket = storage.get(BUCKET_NAME);
    BlobId blobId = BlobId.of(bucket.getName(), blobName);
    InputStream inputStream = fileStream.getInputStream();
    BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType("image/jpeg").build();

    Blob blob = storage.createFrom(blobInfo, inputStream);
    return blob.getMediaLink();

  }

  @GetMapping("/api/gcsDownload")
  public ResponseEntity<String> downloadFile(@PathVariable String image) throws Exception {
    String BUCKET_NAME = "sms_familie_album";
    String PROJECT_ID = "familiealbum-sms";
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