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
        if (repository.count() > 0) {
           return;
        }
        BackUp root = repository.save(BackUp.builder()
            .name("myPC")
            .isChecked(true)
            .parent(null)
            .dateCreated(Instant.now())
            .build());
        List<String> folders = Arrays.asList("C:SimTemps", "C:Projects", "C:FamilieAlbum");
        Set<BackUp> children = folders.stream().map(title -> BackUp.builder()
            .name(title)
            .parent(root) 
            .isChecked(false)
            .dateCreated(Instant.now())
            .build())
            .collect(Collectors.toSet());  
        root.setChildren(children);
        repository.save(root); 
        BackUp projectsFolder = repository.findByName("C:Projects");
        List<String> projectsChildren = Arrays.asList("D:Projects", "E:Projects");
        Set<BackUp> projectsChildrenSet = projectsChildren.stream().map(title -> BackUp.builder()
            .name(title)
            .parent(projectsFolder) 
            .isChecked(false)
            .dateCreated(Instant.now())
            .build())
            .collect(Collectors.toSet()); 
        projectsFolder.setChildren(projectsChildrenSet);
        repository.save(projectsFolder);
        BackUp simTempsFolder = repository.findByName("C:SimTemps");
        List<String> simTempsChildren = Arrays.asList("D:SimTemps", "E:SimTemps");
        Set<BackUp> simTempsChildrenSet = simTempsChildren.stream().map(title -> BackUp.builder()
            .name(title)
            .parent(simTempsFolder) 
            .isChecked(false)
            .dateCreated(Instant.now())
            .build())
            .collect(Collectors.toSet());
        simTempsFolder.setChildren(simTempsChildrenSet);
        repository.save(simTempsFolder); 
        BackUp familieAlbumFolder = repository.findByName("C:FamilieAlbum");
        List<String> familieAlbumChildren = Arrays.asList("D:FamilieAlbum", "E:FamilieAlbum");
        Set<BackUp> familieAlbumChildrenSet = familieAlbumChildren.stream().map(title -> BackUp.builder()
            .name(title)
            .parent(familieAlbumFolder) 
            .isChecked(false)
            .dateCreated(Instant.now())
            .build())
            .collect(Collectors.toSet());
        familieAlbumFolder.setChildren(familieAlbumChildrenSet);
        repository.save(familieAlbumFolder);  
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