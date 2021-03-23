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
        System.out.println("BackUpLoader..root...1");
        if (repository.count() > 0) {
           System.out.println("..BACK_UP TABLE NOT EMPTY!!..");
           return;
        }
        BackUp rootFolder = BackUp.builder().name("root").parent(null).dateCreated(Instant.now()).build();
        System.out.println("BackUpLoader..rootFolder..." + rootFolder);
        List<String> folders = Arrays.asList("SimTemps", "Projects", "FamilieAlbum");
        Set<BackUp> children = folders.stream().map(title -> BackUp.builder()
            .name(title)
            .parent(rootFolder) 
            .isChecked(true)
            .dateCreated(Instant.now())
            .build())
            .collect(Collectors.toSet());                             
        System.out.println("BackUpLoader..children..." + children);
        BackUp root = repository.save(BackUp.builder()
            .name(rootFolder.getName())
            .isChecked(true)
            .dateCreated(Instant.now())
            .children(children)
            .build());        
        System.out.println("BackUpLoader...root..." + root);

        //BackUp simTempsFolder = BackUp.builder().name("root").parent(null).dateCreated(Instant.now()).build();
        BackUp simTempsFolder = repository.findByName("SimTemps");
        System.out.println("BackUpLoader..simTempsFolder..." + simTempsFolder);
        List<String> simTempsChildren = Arrays.asList("DSimTemps", "ESimTemps");
        Set<BackUp> simTempsChildrenSet = simTempsChildren.stream().map(title -> BackUp.builder()
            .name(title)
            .parent(simTempsFolder) 
            .isChecked(true)
            .dateCreated(Instant.now())
            .build())
            .collect(Collectors.toSet());                             
        System.out.println("BackUpLoader..simTempsChildrenSet..." + simTempsChildrenSet);
        BackUp simTempsDB = repository.save(BackUp.builder()
            .name(simTempsFolder.getName())
            .isChecked(true)
            .dateCreated(Instant.now())
            .children(simTempsChildrenSet)
            .build());        
        System.out.println("BackUpLoader...simTempsDB..." + simTempsDB);

        /*
        BackUp simTempsFolder = repository.findByName("SimTemps");
        System.out.println("BackUpLoader...simTempsFolder..." + simTempsFolder);

        List<String> simTemps = Arrays.asList("DSimTemps", "ESimTemps");
        Set<BackUp> simTempsChildren = simTemps.stream().map(title -> BackUp.builder()
            .name(title)
            .parent(simTempsFolder) 
            .isChecked(true)
            .dateCreated(Instant.now())
            .build())
            .collect(Collectors.toSet()); 
        System.out.println("BackUpLoader..simTempsChildren... " + simTempsChildren);

        simTempsFolder.setChildren(simTempsChildren);
        BackUp rootSimTemps = repository.save(simTempsFolder); 
        System.out.println("BackUpLoader..rootSimTemps... " + rootSimTemps);
        
        BackUp rootFamilieAlbum = repository.save(BackUp.builder()
            .name(familieAlbumFolder.getName())
            .isChecked(true)
            .dateCreated(Instant.now())
            .children(familieAlbumChildren)
            .build());   
        */

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