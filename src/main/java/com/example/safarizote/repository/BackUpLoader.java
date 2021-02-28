package com.example.safarizote.repository;

import java.time.Instant;
import java.util.Arrays;
import java.util.HashSet;
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
        System.out.println("BackUpLoader..root...");
        if (repository.count() > 0) {
           System.out.println("..TABLE ONT EMPTY!!..");
           //return;
        }
        BackUp rootFolder = BackUp.builder().name("root").parent(null).dateCreated(Instant.now()).build();
        System.out.println("BackUpLoader..root..." + rootFolder);
        List<String> folders = Arrays.asList("SimTemps", "Projects", "FamilieAlbum");
        Set<BackUp> children = folders.stream().map(title -> BackUp.builder()
                .name(title)
                .parent(rootFolder) 
                .collapsed(true)
                .dateCreated(Instant.now())
                .build())
                .collect(Collectors.toSet());    
        System.out.println("BackUpLoader..root...");
        BackUp root = repository.save(BackUp.builder()
                .name(rootFolder.getName())
                .collapsed(true)
                .dateCreated(Instant.now())
                .children(children)
                .build());        
        System.out.println("BackUpLoader...root..." + root);

        BackUp simTempsFolder = repository.findByName("SimTemps");
        System.out.println("BackUpLoader...SimTemps..." + simTempsFolder);

        List<String> simTemps = Arrays.asList("DSimTemps", "ESimTemps");
        Set<BackUp> simTempsChildren = simTemps.stream().map(title -> BackUp.builder()
                .name(title)
                .parent(simTempsFolder) 
                .collapsed(true)
                .dateCreated(Instant.now())
                .build())
                .collect(Collectors.toSet()); 
        System.out.println("BackUpLoader..SimTemps...");
        BackUp rootSimTemps = repository.save(BackUp.builder()
                .name(simTempsFolder.getName())
                .collapsed(true)
                .dateCreated(Instant.now())
                .children(simTempsChildren)
                .build());        
        System.out.println("BackUpLoader..SimTemps..." + rootSimTemps);

        System.out.println("BackUpLoader...OK!");
        repository.findAll().forEach((backUp) -> {
            logger.info("{}", backUp);
        });
    }
}