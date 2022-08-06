package com.safari.springboot.safarizote.controller;

import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.nio.ByteBuffer;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.TimeUnit;

import com.google.api.gax.paging.Page;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.ReadChannel;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Bucket;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import com.safari.springboot.safarizote.model.GcsFolder;

import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class BackUpController {
  private static final int BUFFER_SIZE = 64 * 1024;
  final Logger logger = LoggerFactory.getLogger(BackUpController.class);

  @Value("gs://${gcs-resource-test-bucket}/mail.jpg")
  private Resource gcsFile;

  @RequestMapping(value="/api/ping", method=RequestMethod.GET)
  @ResponseBody
  public String healthCheck() {
    return "This is working well";
  }

  @RequestMapping(value="/api/listFolders", method=RequestMethod.GET)
  public List<String> listFolders(@RequestParam("directory") String directory) throws Exception {
    String BUCKET_NAME = "sms_familie_album";
    String PROJECT_ID  = "familiealbum-sms";
    Resource resource = new ClassPathResource("credentials.json");
    GoogleCredentials credentials = GoogleCredentials.fromStream(resource.getInputStream());
    Storage storage = StorageOptions.newBuilder().setProjectId(PROJECT_ID).setCredentials(credentials).build().getService();

    Page<Blob> blobs = storage.list(BUCKET_NAME, Storage.BlobListOption.currentDirectory(), Storage.BlobListOption.prefix(""));
    Iterable<Blob> blobIterator = blobs.iterateAll();
    List<String> folders = new ArrayList<>();
    blobIterator.forEach(blob -> {
        if (blob.isDirectory()) {
            folders.add(blob.getName());
        }
    });
    return folders;
}
  
@RequestMapping(value="/api/findAlbum", method=RequestMethod.POST)
public ResponseEntity<List<GcsFolder>> findAlbum(@RequestBody(required = false) String folder) throws IOException {
    JSONObject jsonObj = new JSONObject(folder);
    String body = jsonObj.getString("body");
    JSONObject jsonBody = new JSONObject(body);
    JSONObject jsonFolder = jsonBody.getJSONObject("data");

    String BUCKET_NAME = "sms_familie_album";
    String PROJECT_ID  = "familiealbum-sms";
    Resource resource = new ClassPathResource("credentials.json");
    GoogleCredentials credentials = GoogleCredentials.fromStream(resource.getInputStream());
    Storage storage = StorageOptions.newBuilder().setProjectId(PROJECT_ID).setCredentials(credentials).build().getService();
    StringBuilder directoryPrefix = new StringBuilder();
    directoryPrefix.append(folder);

    Page<Blob> listObjects = storage.list(BUCKET_NAME,
          Storage.BlobListOption.prefix(jsonFolder.getString("folder")),
          Storage.BlobListOption.currentDirectory());
    List<GcsFolder> imageUrls = new ArrayList<>();
    Iterable<Blob> blobs = listObjects.iterateAll();
    
    for(Blob blob : blobs) {
      URL signedUrl = blob.signUrl(14, TimeUnit.DAYS);
      String imageUrl = signedUrl.toExternalForm();
      GcsFolder obj = new GcsFolder(blob.getName(), imageUrl);
      imageUrls.add(obj);
    }

    return new ResponseEntity<>(imageUrls, HttpStatus.OK);
  }    



  @RequestMapping(value="/api/backUp", method=RequestMethod.GET)
  public String readGcsFile() throws IOException {
    return StreamUtils.copyToString(
        gcsFile.getInputStream(),
        Charset.defaultCharset());
  }

  @GetMapping("/api/listAll")
  public ResponseEntity<List<GcsFolder>> findAll() throws IOException {

      String BUCKET_NAME = "sms_familie_album";
      String PROJECT_ID  = "familiealbum-sms";
      Resource resource = new ClassPathResource("credentials.json");
      GoogleCredentials credentials = GoogleCredentials.fromStream(resource.getInputStream());

      Storage storage = StorageOptions.newBuilder().setProjectId(PROJECT_ID).setCredentials(credentials).build().getService();
      Page<Blob> blobs = storage.list(BUCKET_NAME);
      List<GcsFolder> map = new ArrayList<>();

      Integer duration = 120;
      //https://storage.googleapis.com/${bucket.name}/${blob.name}
      for (Blob blob : blobs.iterateAll()) {
           URL signedUrl = storage.signUrl(blob, duration, TimeUnit.MINUTES);
           String imageUrl = signedUrl.toExternalForm();
           GcsFolder obj = new GcsFolder(blob.getName(), imageUrl);
           map.add(obj);
      }
      System.out.println(map);
      return ResponseEntity.ok().body(map);
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


    public Storage storageService() throws Exception {
      String PROJECT_ID  = "familiealbum-sms";
      Resource resource = new ClassPathResource("credentials.json");
      GoogleCredentials credentials = GoogleCredentials.fromStream(resource.getInputStream());
      
      return StorageOptions.newBuilder()
              .setProjectId(PROJECT_ID)
              .setCredentials(credentials)
              .build()
              .getService();
  }

}
