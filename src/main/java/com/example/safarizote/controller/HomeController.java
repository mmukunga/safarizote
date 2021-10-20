package com.example.safarizote.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

import com.example.safarizote.model.Safari;
import com.example.safarizote.repository.SafariRepository;

@RestController
public class HomeController { 
  @Autowired
  private SafariRepository repository;

  @GetMapping(value = "/api/safaris")
  public ResponseEntity<List<Safari>> findSafaris(){
    List<Safari> sourceSet = repository.findAll();
    return new ResponseEntity<>(sourceSet, HttpStatus.OK);
  }
}