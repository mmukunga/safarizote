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
        System.out.println("BackUpLoader..root...1");
        if (repository.count() > 0) {
           System.out.println("..TABLE ONT EMPTY!!..");
           return;
        }
        BackUp rootFolder = BackUp.builder().name("root").parent(null).dateCreated(Instant.now()).build();
        System.out.println("BackUpLoader..root...2" + rootFolder);
        List<String> folders = Arrays.asList("SimTemps", "Projects", "FamilieAlbum");
        Set<BackUp> children = folders.stream().map(title -> BackUp.builder()
                .name(title)
                .parent(rootFolder) 
                .collapsed(true)
                .dateCreated(Instant.now())
                .build())
                .collect(Collectors.toSet());    
        System.out.println("BackUpLoader..root...3");
        BackUp root = repository.save(BackUp.builder()
                .name(rootFolder.getName())
                .collapsed(true)
                .dateCreated(Instant.now())
                .children(children)
                .build());        
        System.out.println("BackUpLoader...root...4" + root);

        BackUp simTempsFolder = repository.findByName("SimTemps");
        System.out.println("BackUpLoader...SimTemps...5" + simTempsFolder);

        List<String> simTemps = Arrays.asList("DSimTemps", "ESimTemps");
        Set<BackUp> simTempsChildren = simTemps.stream().map(title -> BackUp.builder()
                .name(title)
                .parent(simTempsFolder) 
                .collapsed(true)
                .dateCreated(Instant.now())
                .build())
                .collect(Collectors.toSet()); 
        System.out.println("BackUpLoader..SimTemps...6");
        BackUp rootSimTemps = repository.save(BackUp.builder()
                .name(simTempsFolder.getName())
                .collapsed(true)
                .dateCreated(Instant.now())
                .children(simTempsChildren)
                .build());        
        System.out.println("BackUpLoader..SimTemps...7" + rootSimTemps);

        BackUp projectsFolder = repository.findByName("Projects");
        System.out.println("BackUpLoader...Projects...5" + projectsFolder);
        List<String> projects = Arrays.asList("DProjects", "EProjects");
        Set<BackUp> projectsChildren = projects.stream().map(title -> BackUp.builder()
                .name(title)
                .parent(projectsFolder) 
                .collapsed(true)
                .dateCreated(Instant.now())
                .build())
                .collect(Collectors.toSet()); 
        System.out.println("BackUpLoader..Projects...6");
        BackUp rootProjects = repository.save(BackUp.builder()
                .name(projectsFolder.getName())
                .collapsed(true)
                .dateCreated(Instant.now())
                .children(projectsChildren)
                .build());        
        System.out.println("BackUpLoader..Projects...7" + rootProjects);

        BackUp familieAlbumFolder = repository.findByName("FamilieAlbum");
        System.out.println("BackUpLoader...FamilieAlbum...5" + familieAlbumFolder);
        List<String> familieAlbum = Arrays.asList("DFamilieAlbum", "EFamilieAlbum");
        Set<BackUp> familieAlbumChildren = familieAlbum.stream().map(title -> BackUp.builder()
                .name(title)
                .parent(familieAlbumFolder) 
                .collapsed(true)
                .dateCreated(Instant.now())
                .build())
                .collect(Collectors.toSet()); 
        System.out.println("BackUpLoader..FamilieAlbum...6");
        BackUp rootFamilieAlbum = repository.save(BackUp.builder()
                .name(familieAlbumFolder.getName())
                .collapsed(true)
                .dateCreated(Instant.now())
                .children(familieAlbumChildren)
                .build());        
        System.out.println("BackUpLoader..FamilieAlbum...7" + rootFamilieAlbum);

        System.out.println("BackUpLoader...OK!");
        repository.findAll().forEach((backUp) -> {
            logger.info("{}", backUp);
        });
    }
}