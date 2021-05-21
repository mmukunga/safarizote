package com.example.safarizote.controller;

import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Set;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.transaction.annotation.Transactional;

import com.example.safarizote.model.BackUp;
import com.example.safarizote.repository.BackUpRepository;

import com.example.safarizote.utils.CopyDir;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

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
        /*
        System.out.println("BackUp.findAll() SIZE:= " + categories.size());
        StringBuffer indentation = new StringBuffer();
        indentation.append(" ");
        for (BackUp category : categories) {
            System.out.println(indentation.toString() + category.getName() + " " + category.getDateCreated());
            if (category.getChildren().size() > 0){
               displayList(category, indentation);
            }
        }
        */
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
        //int folderId = Integer.valueOf(id);
        System.out.println("BackUpController: BackUp:= " + backUp);
        //Optional<BackUp> backUp = repository.findById(id);
        return new ResponseEntity<>(backUp, HttpStatus.OK);
    }

    @RequestMapping(value="/api/doBackUp", method={RequestMethod.POST})
    public ResponseEntity<BackUp> doBackUp(@RequestBody List<BackUp> folders) throws Exception {
        logger.warn("Folders:= " + folders);
        List<BackUp> items = repository.findAll(); 
        BackUp targetFolder = null;
        for (int i = 0; i < folders.size(); i++) {
            System.out.println(folders);
            targetFolder = folders.get(i);
        }

        BackUp parent = null;
        BackUp target = null;
        for (int i = 0; i < items.size(); i++) {
            System.out.println(items.get(i));
            Set<BackUp> childs = items.get(i).getChildren();           
            for(BackUp child : childs) {
                if(child.getId().equals(targetFolder.getId())){
                    System.out.println(child.getId() + " ***BINGO*** " + targetFolder.getId());
                    parent = items.get(i);
                    target = child;
                }
            }
        }

        System.out.println("BackUpController: ParentDir:= " + parent);
        String sourceDir = parent.getName();
        System.out.println("BackUpController: SourceDir:= " + sourceDir);
        for(BackUp backUp : parent.getChildren()){
            if (backUp.getId().equals(target.getId())) {
                String targetDir = backUp.getName();
                System.out.println("BackUpController: TargetId:= " + backUp.getId() + " TargetName:= " + target);
                System.out.println("BackUpController: TargetDir:= " + targetDir);
                //Files.walkFileTree(sourceDir, new CopyDir(sourceDir, targetDir));
            }
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