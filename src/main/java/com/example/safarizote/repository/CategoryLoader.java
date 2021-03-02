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
        Category electronics = Category.builder().name("Electronics").parent(null).children(new HashSet<>()).dateCreated(Instant.now()).build();
        Category mobilePhones = Category.builder().name("Mobile phones").parent(electronics).children(new HashSet<>()).dateCreated(Instant.now()).build();
        Category washingMachines = Category.builder().name("Washing machines").parent(electronics).children(new HashSet<>()).dateCreated(Instant.now()).build();
        electronics.getChildren().add(mobilePhones);
        electronics.getChildren().add(washingMachines);
        Category iPhone = Category.builder().name("iPhone").parent(mobilePhones).children(new HashSet<>()).dateCreated(Instant.now()).build();
        Category samsung = Category.builder().name("Samsung").parent(mobilePhones).children(new HashSet<>()).dateCreated(Instant.now()).build();
        mobilePhones.getChildren().add(iPhone);
        mobilePhones.getChildren().add(samsung);

        System.out.println("CategoryLoader... electronics.getName()... " + electronics.getName());
        Category galaxy = Category.builder().name("Galaxy").parent(samsung).children(new HashSet<>()).dateCreated(Instant.now()).build();
        samsung.getChildren().add(galaxy);
        repository.save(electronics);
        System.out.println("CategoryLoader...OK!");

        repository.findAll().forEach((category) -> {
          //displayCategory(backUp);
          logger.info("{}", category.getName()); 
        });
    }

    /*
    public void displayCategory(Category parent) {  
      if (parent.getChildren().size()==0) {
        logger.info("{}", parent); 
        return;
      }     

      Set<Category> children = parent.getChildren();
      Iterator<Category> itr = children.iterator();
      while (itr.hasNext()) { 
         Category backUp = itr.next();  
         if (backUp.getChildren().size() != 0) {
            displayCategory(backUp);    
         } else {
            logger.info("{}", backUp);        
         }   
      }
    }
    */
}