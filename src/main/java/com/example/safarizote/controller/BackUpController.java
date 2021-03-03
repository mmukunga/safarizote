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
        System.out.println("Category.findAll() , the time at the server is now " + new Date());
        List<Category> backUps = repository.findAll();
        System.out.println("Category.findAll() , the time at the server is now " + new Date());

        // New Enhanced For loop
        System.out.println("\n==============> 1. New Enhanced For loop Example..");
        for (Category temp : backUps) {
            System.out.println(temp);
        }
        System.out.println("\n==============> 2. New Enhanced For loop Example..");
        System.out.println("Category.findAll()  End OK!");
        return new ResponseEntity<>(backUps, HttpStatus.OK);
    }
}