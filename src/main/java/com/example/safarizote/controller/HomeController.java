package com.example.safarizote.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

  private Map<Long, Safari> catalog = new HashMap<>();

  @GetMapping(value = "/api/safaris")
  public ResponseEntity<List<Safari>> findSafaris(){
    List<Safari> sourceSet = repository.findAll();

    sourceSet.forEach(safari -> {
      Long Id = Long.valueOf(safari.getId().longValue());
      catalog.put(Id, safari);
    });

    return ResponseEntity.ok().body(sourceSet);
  }
}