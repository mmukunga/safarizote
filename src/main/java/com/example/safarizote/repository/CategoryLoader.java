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
        System.out.println("..CategoryLoader...0!");
        if (repository.count() > 0) {
           System.out.println("..CATEGORY TABLE IS NOT EMPTY!!..");
           return;
        }
        System.out.println("..CategoryLoader...1!");
        Category rootFolder = Category.builder().name("MyRootPC").parent(null).dateCreated(Instant.now()).build();
        Category simTemps = Category.builder().name("SimTemps").parent(rootFolder).dateCreated(Instant.now()).build();
        Category projects = Category.builder().name("Projects").parent(rootFolder).dateCreated(Instant.now()).build();
        Category famileAlbum = Category.builder().name("FamilieAlbum").parent(rootFolder).dateCreated(Instant.now()).build();
        System.out.println("..CategoryLoader...2!"); 
        rootFolder.addChild(simTemps);
        rootFolder.addChild(projects);
        rootFolder.addChild(famileAlbum);
        System.out.println("..CategoryLoader...3!"); 
        Category dSimTemps = Category.builder().name("DSimTemps").parent(simTemps).dateCreated(Instant.now()).build();
        Category eSimTemps = Category.builder().name("ESimTemps").parent(simTemps).dateCreated(Instant.now()).build();
        Category dProjects = Category.builder().name("DProjects").parent(projects).dateCreated(Instant.now()).build();
        Category eProjects = Category.builder().name("EProjects").parent(projects).dateCreated(Instant.now()).build();
        Category dFamilieAlbum = Category.builder().name("DFamilieAlbum").parent(famileAlbum).dateCreated(Instant.now()).build();
        Category eFamilieAlbum = Category.builder().name("EFamilieAlbum").parent(famileAlbum).dateCreated(Instant.now()).build();
        System.out.println("..CategoryLoader...4!"); 
        simTemps.addChild(dSimTemps);
        simTemps.addChild(eSimTemps);
        projects.addChild(dProjects);
        projects.addChild(eProjects);
        famileAlbum.addChild(dFamilieAlbum);
        famileAlbum.addChild(eFamilieAlbum);
        System.out.println("..CategoryLoader...5!"); 
        Category galaxy = Category.builder().name("Galaxy").parent(eSimTemps).dateCreated(Instant.now()).build();
        eSimTemps.addChild(galaxy);
        Category reactjs = Category.builder().name("ReactJS").parent(eProjects).dateCreated(Instant.now()).build();
        eProjects.addChild(reactjs);
        Category elias = Category.builder().name("Elias").parent(eFamilieAlbum).dateCreated(Instant.now()).build();
        eFamilieAlbum.addChild(elias);
        repository.save(rootFolder);
        System.out.println("..CategoryLoader...OK!");

        repository.findAll().forEach((category) -> {
          //displayCategory(backUp);
          if (category.getChildren()!= null)
          logger.info("{}", category.getName()); 
        });
    }
}