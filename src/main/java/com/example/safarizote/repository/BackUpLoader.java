package com.example.safarizote.repository;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

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
        repository.deleteAll();
        
        if (repository.count() > 0) {
            return;
        }
        
        BackUp rootFolder = BackUp.builder().name("root").dateCreated(Instant.now()).build();
        repository.save(rootFolder);
        BackUp rootDB = repository.findByName("root");

        BackUp myPCFolder = BackUp.builder().name("Desktop(this PC)").collapsed(true).dateCreated(Instant.now()).build();
        rootDB.setChildren(new HashSet<>(Arrays.asList(myPCFolder)));
        repository.save(rootDB);

        BackUp myPCFolderDB = repository.findByName("Desktop(this PC)");
        BackUp simTemps = BackUp.builder().name("C:\\SimTemps").collapsed(true).dateCreated(Instant.now()).build();
        BackUp projects = BackUp.builder().name("C:\\Projects").collapsed(true).dateCreated(Instant.now()).build();
        BackUp familieAlbum = BackUp.builder().name("C:\\FamilieAlbum").collapsed(true).dateCreated(Instant.now()).build();
        myPCFolderDB.setChildren(new HashSet<>(Arrays.asList(simTemps, projects, familieAlbum)));
        repository.save(myPCFolderDB);

        BackUp simTempsDB = repository.findByName("C:\\SimTemps");
        BackUp a1 = BackUp.builder().name("D:\\SimTemps").dateCreated(Instant.now()).build();
        BackUp a2 = BackUp.builder().name("E:\\SimTemps").dateCreated(Instant.now()).build();
        simTempsDB.setChildren(new HashSet<>(Arrays.asList(a1, a2)));
        repository.save(simTempsDB);

        BackUp projectsDB = repository.findByName("C:\\Projects");
        BackUp b1 = BackUp.builder().name("D:\\Projects").dateCreated(Instant.now()).build();
        BackUp b2 = BackUp.builder().name("E:\\Projects").dateCreated(Instant.now()).build();
        projectsDB.setChildren(new HashSet<>(Arrays.asList(b1, b2)));
        repository.save(projectsDB);

        BackUp familieAlbumDB = repository.findByName("C:\\FamilieAlbum");
        BackUp c1 = BackUp.builder().name("D:\\FamilieAlbum").dateCreated(Instant.now()).build();
        BackUp c2 = BackUp.builder().name("E:\\FamilieAlbum").dateCreated(Instant.now()).build();
        familieAlbumDB.setChildren(new HashSet<>(Arrays.asList(c1, c2)));
        repository.save(familieAlbumDB);
        
        repository.findAll().forEach((backUp) -> {
            logger.info("{}", backUp);
        });
    }
}