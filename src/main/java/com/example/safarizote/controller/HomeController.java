package com.example.safarizote.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.example.safarizote.model.Safari;
import com.example.safarizote.repository.SafariRepository;

@RestController
public class HomeController { 
  @Autowired
  private SafariRepository repository;

  @RequestMapping(value = "/api/safaris",  method={RequestMethod.GET})
  public ResponseEntity<List<Safari>> findSafaris(){
    List<Safari> sourceSet = repository.findAll();

    System.out.println("Simple Java Safari for-loop Example.");
    for (int i = 0; i < sourceSet.size(); i++) {
        System.out.println(sourceSet.get(i));
    }

    System.out.println("findSafaris() End OK!");

    return new ResponseEntity<>(sourceSet, HttpStatus.OK);
  }
}