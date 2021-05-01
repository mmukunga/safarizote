package com.example.safarizote.repository;

import java.time.Instant;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.safarizote.model.BackUp;

@Component
public class BackUpLoader implements CommandLineRunner {
    private static final Logger logger = LoggerFactory.getLogger(BackUpLoader.class);
    @Autowired
    private BackUpRepository repository;

    @Override
    public void run(String... args) throws Exception {
        // repository.deleteAll();
        System.out.println("1.BackUpLoader..BACKUP!!");
        if (repository.count() > 0) {
           System.out.println("..BACK_UP TABLE NOT EMPTY!!..");
           return;
        }
        System.out.println("2.BackUpLoader..BACKUP!!");
        BackUp root = repository.save(BackUp.builder()
            .name("myPC")
            .isChecked(true)
            .parent(null)
            .dateCreated(Instant.now())
            .build());
            System.out.println("BackUpLoader..BACKUP!!");
        System.out.println("3.BackUpLoader..myPC..." + root);
        List<String> folders = Arrays.asList("C:SimTemps", "C:Projects", "C:FamilieAlbum");
        Set<BackUp> children = folders.stream().map(title -> BackUp.builder()
            .name(title)
            .parent(root) 
            .isChecked(false)
            .dateCreated(Instant.now())
            .build())
            .collect(Collectors.toSet());                                         
        System.out.println("BackUpLoader..children..." + children);
        System.out.println("4.BackUpLoader..BACKUP!!");
        root.setChildren(children);
        BackUp dbRoot = repository.save(root);        
        System.out.println("BackUpLoader...dbRoot..." + dbRoot);
        System.out.println("5.BackUpLoader..BACKUP!!");
        BackUp projectsFolder = repository.findByName("C:Projects");
        System.out.println("BackUpLoader..projectsFolder..." + projectsFolder);
        List<String> projectsChildren = Arrays.asList("D:Projects", "E:Projects");
        Set<BackUp> projectsChildrenSet = projectsChildren.stream().map(title -> BackUp.builder()
            .name(title)
            .parent(projectsFolder) 
            .isChecked(false)
            .dateCreated(Instant.now())
            .build())
            .collect(Collectors.toSet());                             
        System.out.println("BackUpLoader..projectsChildrenSet..." + projectsChildrenSet);
        projectsFolder.setChildren(projectsChildrenSet);
        BackUp projectsDB = repository.save(projectsFolder);  
        System.out.println("BackUpLoader...projectsDB..." + projectsDB);
        System.out.println("6.BackUpLoader..BACKUP!!");
        BackUp simTempsFolder = repository.findByName("C:SimTemps");
        System.out.println("BackUpLoader..simTempsFolder..." + simTempsFolder);
        List<String> simTempsChildren = Arrays.asList("D:SimTemps", "E:SimTemps");
        Set<BackUp> simTempsChildrenSet = simTempsChildren.stream().map(title -> BackUp.builder()
            .name(title)
            .parent(simTempsFolder) 
            .isChecked(false)
            .dateCreated(Instant.now())
            .build())
            .collect(Collectors.toSet());                             
        System.out.println("BackUpLoader..simTempsChildrenSet..." + simTempsChildrenSet);
        simTempsFolder.setChildren(simTempsChildrenSet);
        BackUp simTempsDB = repository.save(simTempsFolder);  
        System.out.println("BackUpLoader...simTempsDB..." + simTempsDB);
        System.out.println("7.BackUpLoader..BACKUP!!");
        BackUp familieAlbumFolder = repository.findByName("C:FamilieAlbum");
        System.out.println("BackUpLoader..familieAlbumFolder..." + familieAlbumFolder);
        List<String> familieAlbumChildren = Arrays.asList("D:FamilieAlbum", "E:FamilieAlbum");
        Set<BackUp> familieAlbumChildrenSet = familieAlbumChildren.stream().map(title -> BackUp.builder()
            .name(title)
            .parent(familieAlbumFolder) 
            .isChecked(false)
            .dateCreated(Instant.now())
            .build())
            .collect(Collectors.toSet());                             
        System.out.println("BackUpLoader..familieAlbumChildrenSet..." + familieAlbumChildrenSet);
        familieAlbumFolder.setChildren(familieAlbumChildrenSet);
        BackUp familieAlbumDB = repository.save(familieAlbumFolder);  
        System.out.println("BackUpLoader...familieAlbumDB..." + familieAlbumDB);
        System.out.println("8.BackUpLoader..BACKUP!!");
        System.out.println("BackUpLoader...OK!");
        repository.findAll().forEach((backUp) -> {
          displayBackUp(backUp);
        });
    }

    public void displayBackUp(BackUp parent) {  
      if (parent.getChildren() == null || parent.getChildren().size()==0) {
        logger.info("{}", parent); 
        return;
      }     

      Set<BackUp> children = parent.getChildren();
      Iterator<BackUp> itr = children.iterator();

      while (itr.hasNext()) { 
         BackUp backUp = itr.next();  
         if (backUp.getChildren().size() != 0) {
            displayBackUp(backUp);    
         } else {
            logger.info("{}", backUp);        
         }   
      }
    }
}