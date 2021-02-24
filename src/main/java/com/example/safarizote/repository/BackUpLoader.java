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
        myPCFolderDB.setChildren(new HashSet<>(Arrays.asList(simTemps)));
        repository.save(myPCFolderDB);

        BackUp simTempsDB = repository.findByName("C:\\SimTemps");
        BackUp a1 = BackUp.builder().name("D:\\SimTemps").dateCreated(Instant.now()).build();
        BackUp a2 = BackUp.builder().name("E:\\SimTemps").dateCreated(Instant.now()).build();
        simTempsDB.setChildren(new HashSet<>(Arrays.asList(a1, a2)));
        repository.save(simTempsDB);

        /*
        BackUp projects = BackUp.builder().name("C:\\Projects").collapsed(true).dateCreated(Instant.now()).build();
        BackUp b1 = BackUp.builder().name("D:\\Projects").dateCreated(Instant.now()).build();
        BackUp b2 = BackUp.builder().name("E:\\Projects").dateCreated(Instant.now()).build();
        Set<BackUp> set2 = new HashSet<>(Arrays.asList(b1, b2));
        projects.setChildren(set2);
        repository.save(projects);

        BackUp familieAlbum = BackUp.builder().name("C:\\FamilieAlbum").collapsed(true).dateCreated(Instant.now()).build();
        BackUp c1 = BackUp.builder().name("D:\\FamilieAlbum").dateCreated(Instant.now()).build();
        BackUp c2 = BackUp.builder().name("E:\\FamilieAlbum").dateCreated(Instant.now()).build();
        Set<BackUp> set3 = new HashSet<>(Arrays.asList(c1, c2));
        familieAlbum.setChildren(set3);
        repository.save(familieAlbum);

        Set<BackUp> set4 = new HashSet<>(Arrays.asList(simTemps, projects, familieAlbum));
        myPC.setChildren(set4);
        repository.save(myPC);
        */
        
        /*
        Set<BackUp> set5 = new HashSet<>(Arrays.asList(myPC));
        root.setChildren(set5);
        repository.save(root);
        */

        repository.findAll().forEach((backUp) -> {
            logger.info("{}", backUp);
        });
    }
}