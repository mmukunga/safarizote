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
        System.out.println("BackUpLoader...");
        repository.findAll().forEach((backUp) -> {
            logger.info("{}", backUp);
        });
    }
}