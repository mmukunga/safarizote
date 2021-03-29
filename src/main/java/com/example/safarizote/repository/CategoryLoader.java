package com.example.safarizote.repository;

import java.time.Instant;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.safarizote.model.Category;

@Component
public class CategoryLoader implements CommandLineRunner {
    private static final Logger logger = LoggerFactory.getLogger(CategoryLoader.class);
    @Autowired
    private CategoryRepository repository;

    @Override
    public void run(String... args) throws Exception {
        if (repository.count() > 0) {
           System.out.println("..CATEGORY TABLE IS NOT EMPTY!!..");
           return;
        }
        Category rootFolder = Category.builder().name("MyRootPC").parent(null).dateCreated(Instant.now()).build();
        Category simTemps = Category.builder().name("C:SimTemps").parent(rootFolder).dateCreated(Instant.now()).build();
        Category projects = Category.builder().name("C:Projects").parent(rootFolder).dateCreated(Instant.now()).build();
        Category famileAlbum = Category.builder().name("C:FamilieAlbum").parent(rootFolder).dateCreated(Instant.now()).build();
        rootFolder.addChild(simTemps);
        rootFolder.addChild(projects);
        rootFolder.addChild(famileAlbum);
        Category dSimTemps = Category.builder().name("D:SimTemps").parent(simTemps).dateCreated(Instant.now()).build();
        Category eSimTemps = Category.builder().name("E:SimTemps").parent(simTemps).dateCreated(Instant.now()).build();
        Category dProjects = Category.builder().name("D:Projects").parent(projects).dateCreated(Instant.now()).build();
        Category eProjects = Category.builder().name("E:Projects").parent(projects).dateCreated(Instant.now()).build();
        Category dFamilieAlbum = Category.builder().name("D:FamilieAlbum").parent(famileAlbum).dateCreated(Instant.now()).build();
        Category eFamilieAlbum = Category.builder().name("E:FamilieAlbum").parent(famileAlbum).dateCreated(Instant.now()).build();
        simTemps.addChild(dSimTemps);
        simTemps.addChild(eSimTemps);
        projects.addChild(dProjects);
        projects.addChild(eProjects);
        famileAlbum.addChild(dFamilieAlbum);
        famileAlbum.addChild(eFamilieAlbum); 
        Category galaxy = Category.builder().name("Galaxy").parent(eSimTemps).dateCreated(Instant.now()).build();
        eSimTemps.addChild(galaxy);
        Category reactjs = Category.builder().name("ReactJS").parent(eProjects).dateCreated(Instant.now()).build();
        eProjects.addChild(reactjs);
        Category elias = Category.builder().name("Elias").parent(eFamilieAlbum).dateCreated(Instant.now()).build();
        eFamilieAlbum.addChild(elias);
        repository.save(rootFolder);
        System.out.println("..CategoryLoader...OK!");

        repository.findAll().forEach((category) -> {
          if (category.getChildren()!= null)
          logger.info("{}", category.getName()); 
        });
    }
}