package com.example.safarizote.controller;

import java.util.List;
import java.time.Instant;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;

import com.example.safarizote.model.Metrics;
import com.example.safarizote.repository.MetricsRepository;

@RestController
public class MetricsController { 
  @Autowired
  private MetricsRepository repository;
    
  @RequestMapping(value="/api/healthCheck", method=RequestMethod.POST)
  public ResponseEntity<String> healthCheck() {
      String status = "healthCheck: OK!!";
      return new ResponseEntity<>(status, HttpStatus.OK);
  }

  @RequestMapping(value = "/api/allHits",  method={RequestMethod.GET})
  public ResponseEntity<List<Metrics>> findAll() {
    List<Metrics> visits = repository.findAll();
    System.out.println("\n==============> 1. Metrics..");
    for (Metrics temp : visits) {
        System.out.println(temp);
    }
    System.out.println("Metrics.findAll(),  End OK!");
    return new ResponseEntity<>(visits, HttpStatus.OK);
  }

  @RequestMapping(value = "/api/saveVisit",  method={RequestMethod.POST})
  public ResponseEntity<List<Metrics>> save(@RequestBody Metrics visit) {
    visit.setDateCreated(Instant.now());
    System.out.println("1.===visit===");
    System.out.println(visit);
    System.out.println("2.===visit===");
    repository.save(visit);
    List<Metrics> visits = repository.findAll();
    System.out.println("\n==============> 2. Metrics..");
    //for (Metrics temp : visits) {
        System.out.println("" + visits.size());
    //}
    System.out.println("\n==============> 2. Metrics..");
    System.out.println("Metrics.findAll()  End OK!");
    return new ResponseEntity<>(visits, HttpStatus.OK);
  }
}