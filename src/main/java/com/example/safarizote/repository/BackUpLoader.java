package com.example.safarizote.repository;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

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
        
        BackUp root = BackUp.builder().name("root").dateCreated(Instant.now()).build();
        repository.save(root);
        BackUp myPC = BackUp.builder().name("Desktop(this PC)").collapsed(true).dateCreated(Instant.now()).build();
        
        repository.save(myPC);
        BackUp simTemps = BackUp.builder().name("C:\\SimTemps").collapsed(true).dateCreated(Instant.now()).build();
        BackUp a1 = BackUp.builder().name("D:\\SimTemps").dateCreated(Instant.now()).build();
        BackUp a2 = BackUp.builder().name("E:\\SimTemps").dateCreated(Instant.now()).build();
        List<BackUp> aList = Arrays.asList(a1, a2);
        simTemps.setChildren(aList);
        repository.save(simTemps);

        BackUp projects = BackUp.builder().name("C:\\Projects").collapsed(true).dateCreated(Instant.now()).build();
        BackUp b1 = BackUp.builder().name("D:\\Projects").dateCreated(Instant.now()).build();
        BackUp b2 = BackUp.builder().name("E:\\Projects").dateCreated(Instant.now()).build();
        List<BackUp> bList = Arrays.asList(b1, b2);
        projects.setChildren(bList);
        repository.save(projects);

        BackUp familieAlbum = BackUp.builder().name("C:\\FamilieAlbum").collapsed(true).dateCreated(Instant.now()).build();
        BackUp c1 = BackUp.builder().name("D:\\FamilieAlbum").dateCreated(Instant.now()).build();
        BackUp c2 = BackUp.builder().name("E:\\FamilieAlbum").dateCreated(Instant.now()).build();
        List<BackUp> cList = Arrays.asList(c1, c2);
        familieAlbum.setChildren(cList);
        repository.save(familieAlbum);

        List<BackUp> foldersList = Arrays.asList(simTemps, projects, familieAlbum);
        myPC.setChildren(foldersList);
        repository.save(familieAlbum);
        
        List<BackUp> rootList = Arrays.asList(myPC);
        root.setChildren(rootList);
        repository.save(root);

        repository.findAll().forEach((backUp) -> {
            logger.info("{}", backUp);
        });
    }
}