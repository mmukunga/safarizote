package com.example.safarizote.repository;

import java.time.Instant;
import java.util.Arrays;
import java.util.HashSet;

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
        
        BackUp rootFolder = BackUp.builder().name("root").parent(null).dateCreated(Instant.now()).build();
        repository.save(rootFolder);
        BackUp rootDB = repository.findByName("root");

        BackUp myPCFolder = BackUp.builder().name("MyDesktopPC)").parent(rootDB).collapsed(true).dateCreated(Instant.now()).build();
        rootDB.setChildren(new HashSet<>(Arrays.asList(myPCFolder)));
        repository.save(rootDB);

        BackUp myPCFolderDB = repository.findByName("MyDesktopPC");
        BackUp simTemps = BackUp.builder().name("CSimTemps").parent(myPCFolderDB).collapsed(true).dateCreated(Instant.now()).build();
        BackUp projects = BackUp.builder().name("CProjects").parent(myPCFolderDB).collapsed(true).dateCreated(Instant.now()).build();
        BackUp familieAlbum = BackUp.builder().name("CFamilieAlbum").parent(myPCFolderDB).collapsed(true).dateCreated(Instant.now()).build();
        myPCFolderDB.setChildren(new HashSet<>(Arrays.asList(simTemps, projects, familieAlbum)));
        repository.save(myPCFolderDB);
        
        BackUp simTempsDB = repository.findByName("CSimTemps");
        BackUp a1 = BackUp.builder().name("DSimTemps").parent(simTempsDB).dateCreated(Instant.now()).build();
        BackUp a2 = BackUp.builder().name("ESimTemps").parent(simTempsDB).dateCreated(Instant.now()).build();
        simTempsDB.setChildren(new HashSet<>(Arrays.asList(a1, a2)));
        repository.save(simTempsDB);

        BackUp projectsDB = repository.findByName("CProjects");
        BackUp b1 = BackUp.builder().name("DProjects").parent(projectsDB).dateCreated(Instant.now()).build();
        BackUp b2 = BackUp.builder().name("EProjects").parent(projectsDB).dateCreated(Instant.now()).build();
        projectsDB.setChildren(new HashSet<>(Arrays.asList(b1, b2)));
        repository.save(projectsDB);

        BackUp familieAlbumDB = repository.findByName("CFamilieAlbum");
        BackUp c1 = BackUp.builder().name("DFamilieAlbum").parent(familieAlbumDB).dateCreated(Instant.now()).build();
        BackUp c2 = BackUp.builder().name("EFamilieAlbum").parent(familieAlbumDB).dateCreated(Instant.now()).build();
        familieAlbumDB.setChildren(new HashSet<>(Arrays.asList(c1, c2)));
        repository.save(familieAlbumDB);
        
        repository.findAll().forEach((backUp) -> {
            logger.info("{}", backUp);
        });
    }
}