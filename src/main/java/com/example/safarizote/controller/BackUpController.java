package com.example.safarizote.controller;

import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.ArrayList;
import java.util.Random;
import java.util.Set;
import java.util.Optional;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import javax.imageio.ImageIO;
import java.net.URL;


import java.nio.charset.Charset;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.util.StreamUtils;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.MediaType;

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
import org.springframework.web.multipart.MultipartFile;
import org.springframework.transaction.annotation.Transactional;

import com.example.safarizote.model.BackUp;
import com.example.safarizote.repository.BackUpRepository;

import com.example.safarizote.utils.CopyDir;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@CrossOrigin(origins = "*")
@RestController
public class BackUpController { 
  final Logger logger = LoggerFactory.getLogger(BackUpController.class);

  @Autowired
  private BackUpRepository repository;
    
  @Value("https://storage.cloud.google.com/FamilieAlbum/sms_familie_album/2001%20MaxUlf/MaxUlf/P9010004.JPG")
  private Resource gcsFile;

    @RequestMapping(value = "/api/categories",  method={RequestMethod.GET})
    public ResponseEntity<List<BackUp>> findAll() {
        System.out.println("BackUp.findAll(), the time at the server is now " + new Date());
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
    
    @RequestMapping(value="/api/downloadFile", method={RequestMethod.GET})
    public ResponseEntity<Object> download(@RequestParam("image") String image) throws Exception {
        System.out.println(image);
        List<BackUp> dbFolders = repository.findAll(); 
        System.out.println("An image upload request has come in!!");
        System.out.println("Image from Multipart:= " + image);
        if (image == null) {
            return new ResponseEntity<Object>(HttpStatus.BAD_REQUEST);
        }

        String gcsFile = StreamUtils.copyToString(
            gcsFile.getInputStream(),
            Charset.defaultCharset()) + "\n";
            System.out.println("Image from GoogleCloud Storage:= " + gcsFile);

        return ResponseEntity.ok().build();
    }

    @RequestMapping(value = "/api/gcsDownload", method = RequestMethod.GET)
	public String readGcsFile() throws IOException {
		return StreamUtils.copyToString(
				this.gcsFile.getInputStream(),
				Charset.defaultCharset()) + "\n";
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