package com.example.safarizote.controller;

import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.ArrayList;
import java.util.Random;
import java.util.Set;
import java.util.Optional;

import java.io.File;
import java.io.InputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.URL;

import java.util.regex.Pattern;

import com.google.cloud.storage.Storage;
import com.google.cloud.storage.Bucket;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.StorageOptions;
import com.google.auth.oauth2.GoogleCredentials;

import java.io.OutputStream;
import java.nio.charset.Charset;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.WritableResource;
import org.springframework.util.StreamUtils;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.MediaType;
import org.springframework.http.HttpHeaders;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.safarizote.model.BackUp;
import com.example.safarizote.repository.BackUpRepository;

import com.example.safarizote.utils.CopyDir;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.ByteBuffer;

import java.util.concurrent.TimeUnit;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
public class BackUpController { 
  final Logger logger = LoggerFactory.getLogger(BackUpController.class);

  @Autowired
  private BackUpRepository repository;
  
  //@Value("https://${gcs-resource-test-bucket}/2013%20Disneyland%20Paris/05.08.2013/DSC00945.JPG?authuser=0")
  @Value("gs://${gcs-resource-test-bucket}/mail.jpg")
  private Resource gcsFile;
  
    @RequestMapping(value = "/api/categories",  method={RequestMethod.GET})
    public ResponseEntity<List<BackUp>> findAll() throws IOException {
        System.out.println("BackUp.findAll(), the time at the server is now " + new Date());
        
        String matchExpr = ".*2013 Disneyland Paris.*";
        Pattern matchPattern = Pattern.compile(matchExpr);

        String contentType = "application/octet-stream"; 
        String BUCKET_NAME = "sms_familie_album";
        String OBJECT_NAME = "mail.jpg";
        String PROJECT_ID  = "familiealbum-sms";

        Resource resource = new ClassPathResource("credentials.json");
        GoogleCredentials credentials = GoogleCredentials.fromStream(resource.getInputStream());

        // Get specific file from specified bucket
        Storage storage = StorageOptions.newBuilder().setProjectId(PROJECT_ID).setCredentials(credentials).build().getService();
        List<String> imageUrls = new ArrayList<>();
        List<String> items = new ArrayList<>();
        Bucket bucket = storage.get(BUCKET_NAME);
        for (Blob blob : bucket.list().iterateAll()) {
            String path = blob.getName().substring(blob.getName().indexOf("sms_familie_album"), blob.getName().indexOf("?"));
            System.out.println("PATH path : " + path);
            String folder = path.substring( 0, path.firstIndexOf("/"));
            System.out.println("FOLDER folder : " + folder);
      
            for (Item item : items) {
                if (item.getName().equals(name)) {
                    return true;
                }
            }



            if (matchPattern.matcher(blob.getName()).matches()) {
                System.out.println(blob.getName());
                Integer duration = 15;
                URL signedUrl = storage.signUrl(blob, duration, TimeUnit.MINUTES);
                String imageUrl = signedUrl.toExternalForm();
                System.out.println("Generated IMAGE URL1 : " + imageUrl);
                imageUrls.add(imageUrl);
            }    
        }

        List<BackUp> categories = repository.findAll();
        for (BackUp category : categories) {
            System.out.println(category);
        }

        System.out.println("BackUp.findAll(), the time at the server is now " + new Date());
        System.out.println("BackUp.findAll()  End OK!");
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/upload/{id}",  method={RequestMethod.GET})
    public ResponseEntity<BackUp> getUpload(@PathVariable Long id) {
        System.out.println("BackUpController: getBackUp FolderID:= " + id);
        List<BackUp> categories = repository.findAll();

        Random randomGenerator = new Random();
        int index = randomGenerator.nextInt(categories.size());

        BackUp backUp = categories.get(index);
        backUp.setChildren(null);
        System.out.println("Managers choice this week" + backUp + "our recommendation to you");
        
        return new ResponseEntity<>(backUp, HttpStatus.OK);
    }
    
    @RequestMapping(value="/api/gcsDownloadAll", method={RequestMethod.GET})
    public ResponseEntity<Object> readGcsFiles(@RequestParam("folder") String folder) throws Exception {
        System.out.println(folder);

        String matchExpr = ".*2013 Disneyland Paris.*";
        Pattern matchPattern = Pattern.compile(matchExpr);

        String contentType = "application/octet-stream"; 
        String BUCKET_NAME = "sms_familie_album";
        String OBJECT_NAME = "mail.jpg";
        String PROJECT_ID  = "familiealbum-sms";

        List<BackUp> dbFolders = repository.findAll(); 
        System.out.println("An folder upload request has come in!!");
        System.out.println("Folder from Multipart:= " + folder);
        if (folder == null) {
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
        }

        Resource resource = new ClassPathResource("credentials.json");
        GoogleCredentials credentials = GoogleCredentials.fromStream(resource.getInputStream());

        // Get specific file from specified bucket
        Storage storage = StorageOptions.newBuilder().setProjectId(PROJECT_ID).setCredentials(credentials).build().getService();
        List<String> imageUrls = new ArrayList<>();
        Bucket bucket = storage.get(BUCKET_NAME);
        for (Blob blob : bucket.list().iterateAll()) {
            if (matchPattern.matcher(blob.getName()).matches()) {
                System.out.println(blob.getName());
                Integer duration = 15;
                URL signedUrl = storage.signUrl(blob, duration, TimeUnit.MINUTES);
                String imageUrl = signedUrl.toExternalForm();
                System.out.println("Generated IMAGE URL 3 : " + imageUrl);
                imageUrls.add(imageUrl);
            }
        }

        return ResponseEntity.ok().build();
    }

    @RequestMapping(value = "/api/gcsDownload", method = RequestMethod.GET)
	public ResponseEntity<?> readGcsFile(@RequestParam("image") String image) throws IOException {
        System.out.println("1.Image/gcsFile from GoogleCloud Storage:= " + image);
        
        String matchExpr = ".*2013 Disneyland Paris.*";
        Pattern matchPattern = Pattern.compile(matchExpr);

        String contentType = "application/octet-stream"; 
        String BUCKET_NAME = "sms_familie_album";
        String OBJECT_NAME = "mail.jpg";
        String PROJECT_ID  = "familiealbum-sms";

        String gcsFile = StreamUtils.copyToString(
            this.gcsFile.getInputStream(),
            Charset.defaultCharset()) + "\n";
        
        Resource resource = new ClassPathResource("credentials.json");
        GoogleCredentials credentials = GoogleCredentials.fromStream(resource.getInputStream());

        // Get specific file from specified bucket
        Storage storage = StorageOptions.newBuilder().setProjectId(PROJECT_ID).setCredentials(credentials).build().getService();
        BlobId blobId = BlobId.of(BUCKET_NAME, OBJECT_NAME);
        Blob blob = storage.get(blobId);

        System.out.println("Image URL : " +  blob.getMediaLink());    

        long size = blob.getSize(); // no RPC call is required
        byte[] content = blob.getContent(); // one or multiple RPC calls will be issued

        Integer duration = 15;
        URL signedUrl = storage.signUrl(blob, duration, TimeUnit.MINUTES);
        String imageUrl = signedUrl.toExternalForm();
        System.out.println("Generated IMAGE URL XX : " + imageUrl);

        Bucket bucket = storage.get(BUCKET_NAME);
        for (Blob b : bucket.list().iterateAll()) {
            if (matchPattern.matcher(b.getName()).matches()) {
                System.out.println("Generated IMAGE URL 1 : " + imageUrl);
                System.out.println(b.getName());
            }    
        }

        return new ResponseEntity<>(imageUrl, HttpStatus.OK); 
	}
   

	@RequestMapping(value = "/api/gcsUpload", method = RequestMethod.POST)
	String writeGcs(@RequestBody String data) throws IOException {
		try (OutputStream os = ((WritableResource) this.gcsFile).getOutputStream()) {
			os.write(data.getBytes());
		}
		return "file was updated\n";
	}

    public void displayList(BackUp category, StringBuffer indentation){
        indentation.append(" ");
        for (BackUp temp : category.getChildren()) {
            System.out.println(indentation.toString() + temp.getName() + " " + temp.getDateCreated());
            if (temp.getChildren().size() > 0){
                displayList(temp, indentation);
            }
        }
    }
}