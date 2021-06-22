package com.example.safarizote.controller;

import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.ArrayList;
import java.util.Set;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.transaction.annotation.Transactional;

import com.example.safarizote.model.BackUp;
import com.example.safarizote.repository.BackUpRepository;

import com.example.safarizote.utils.CopyDir;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.http.MediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
public class BackUpController { 
  final Logger logger = LoggerFactory.getLogger(BackUpController.class);

  @Autowired
  private BackUpRepository repository;
    
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

    @RequestMapping(value = "/api/backUp/{id}",  method={RequestMethod.GET})
    public ResponseEntity<BackUp> getBackUp(@PathVariable Long id) {
        System.out.println("BackUpController: getBackUp FolderID:= " + id);
        List<BackUp> categories = repository.findAll();
        BackUp backUp = new BackUp();
        for (BackUp category : categories) {
            System.out.println(category);
            if (category.getId().equals(id)){
                backUp = category;
            } else {
                System.out.println(category.getId() + " " + id);
            } 
        }
        
        return new ResponseEntity<>(backUp, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/doUpload", method = RequestMethod.POST, consumes = {"multipart/mixed"})
    public ResponseEntity<?> doUpload(@RequestPart("data") MultipartFile photoData){
        System.out.println("Uploading..");
        return new ResponseEntity<>(HttpStatus.valueOf(200));
    }
    
    /*
    @RequestMapping(value="/api/doUpload", method=RequestMethod.POST)
    public String doUpload(@RequestParam("file") MultipartFile file) {
        return "doUploaded!!";
    }
    */

    /*
    @RequestMapping(value="/api/doUpload", method=RequestMethod.POST, consumes ={"multipart/form-data"})
    public ResponseEntity<List<BackUp>> doUpload(@RequestPart("file") MultipartFile[] images) {
        System.out.println("BackUp.doUpload(), the time at the server is now " + new Date());
        System.out.println("doUpload Start... ");
        
        for (MultipartFile file : images) {
            System.out.println("Name : " + file.getName());
            System.out.println("Type : " + file.getContentType());
            System.out.println("Name : " + file.getOriginalFilename());
            System.out.println("Size : " + file.getSize());
        }      

        List<BackUp> categories = repository.findAll();
        for (BackUp category : categories) {
            System.out.println(category);
        }
        System.out.println("BackUp.doUpload(), the time at the server is now " + new Date());
        System.out.println("BackUp.doUpload()  End OK!");
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }
*/

    @RequestMapping(value="/api/doBackUp", method={RequestMethod.POST})
    public ResponseEntity<BackUp> doBackUp(@RequestBody List<BackUp> folders) throws Exception {
        List<BackUp> dbFolders = repository.findAll(); 
        BackUp parent = null;
        for (int i = 0; i < dbFolders.size(); i++) {
            Set<BackUp> childs = dbFolders.get(i).getChildren();           
            for (BackUp child : childs) {
                for (BackUp folder: folders){
                    if (folder.getId().equals(child.getId())){
                        parent = dbFolders.get(i);
                        break;
                    }
                }
            }
        }

        System.out.println("BackUpController: ParentDir:= " + parent);
        List<BackUp> targets = new ArrayList<>();          
        for (BackUp child : parent.getChildren()) {
            for (BackUp folder: folders) {
                if (folder.getId().equals(child.getId())){
                    targets.add(child);
                }
            }
        }
        
        Path sourceDir;
        Path targetDir;

        String source = parent.getName();
        source = source.replaceAll(":", ":/");

        String osName = System.getProperty("os.name");
        logger.warn("Os.Name:= " + osName);

        for (BackUp backUp : targets) {
            String target = backUp.getName();
            target = target.replaceAll(":", ":/");

            if (!osName.contains("Linux")) {
              sourceDir = Paths.get(source);
              targetDir = Paths.get(target);
            } else {
              int srcIndex = source.indexOf(":/"); 
              int tgtIndex = target.indexOf(":/");
              sourceDir = Paths.get("/home/x00sms/source/".concat(source.substring(srcIndex+1)));
              targetDir = Paths.get("/home/x00sms/target/".concat(target.substring(tgtIndex+1)));
            }

            System.out.println("BackUpController: SourceDir:= " + sourceDir);
            System.out.println("BackUpController: TargetDir:= " + targetDir);
            //Files.walkFileTree(sourceDir, new CopyDir(sourceDir, targetDir));
            System.out.println("--End---");
        }    
        
        logger.warn("BackUp Completed OK!");
        return new ResponseEntity<>(parent, HttpStatus.OK);
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