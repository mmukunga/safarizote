package com.example.safarizote.controller;

import java.util.Date;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.transaction.annotation.Transactional;
import com.example.safarizote.model.Category;
import com.example.safarizote.repository.CategoryRepository;

@RestController
public class BackUpController { 
  @Autowired
  private CategoryRepository repository;
    
    @Transactional
    @RequestMapping(value = "/api/backUp",  method={RequestMethod.GET})
    public ResponseEntity<List<Category>> findAll() {
        System.out.println("Category.findAll(), the time at the server is now " + new Date());
        List<Category> categories = repository.findAll();
        System.out.println("Category.findAll() SIZE:= " + categories.size());
        StringBuffer indentation = new StringBuffer();
        indentation.append(" ");
        for (Category category : categories) {
            System.out.println(indentation.toString() + category.getName() + " " + category.getDateCreated());
            if (category.getChildren().size() > 0){
               displayList(category, indentation);
            }
        }
        System.out.println("Category.findAll(), the time at the server is now " + new Date());
        //String json = new Gson().toJson(categories);
        //System.out.println("Category.findAll(), JSON!:= " + json);

        System.out.println("Category.findAll()  End OK!");
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    public void displayList(Category category, StringBuffer indentation){
        indentation.append(" ");
        for (Category temp : category.getChildren()) {
            System.out.println(indentation.toString() + temp.getName() + " " + temp.getDateCreated());
            if (temp.getChildren().size() > 0){
                displayList(temp, indentation);
            }
        }
    }

}