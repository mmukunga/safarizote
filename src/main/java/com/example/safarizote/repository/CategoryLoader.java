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
        Category electronics = Category.builder().name("Electronics").parent(null).dateCreated(Instant.now()).build();
        Category mobilePhones = Category.builder().name("Mobile phones").parent(electronics).dateCreated(Instant.now()).build();
        Category washingMachines = Category.builder().name("Washing machines").parent(electronics).dateCreated(Instant.now()).build();
        System.out.println("..CategoryLoader...2!"); 
        electronics.addChild(mobilePhones);
        electronics.addChild(washingMachines);
        System.out.println("..CategoryLoader...3!"); 
        Category iPhone = Category.builder().name("iPhone").parent(mobilePhones).dateCreated(Instant.now()).build();
        Category samsung = Category.builder().name("Samsung").parent(mobilePhones).dateCreated(Instant.now()).build();
        System.out.println("..CategoryLoader...4!"); 
        mobilePhones.addChild(iPhone);
        mobilePhones.addChild(samsung);
        System.out.println("..CategoryLoader...5!"); 
        Category galaxy = Category.builder().name("Galaxy").parent(samsung).dateCreated(Instant.now()).build();
        samsung.addChild(galaxy);
        repository.save(electronics);
        System.out.println("..CategoryLoader...OK!");

        repository.findAll().forEach((category) -> {
          //displayCategory(backUp);
          logger.info("{}", category.getName()); 
        });
    }
}