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

import com.example.safarizote.model.Tracker;
import com.example.safarizote.repository.TrackerRepository;

@RestController
public class MetricsController { 
  @Autowired
  private TrackerRepository repository;
    
  @RequestMapping(value="/api/healthCheck", method=RequestMethod.POST)
  public ResponseEntity<String> healthCheck() {
      String status = "healthCheck: OK!!";
      return new ResponseEntity<>(status, HttpStatus.OK);
  }

  @RequestMapping(value = "/api/allHits",  method={RequestMethod.GET})
  public ResponseEntity<List<Tracker>> findAll() {
    List<Tracker> visits = repository.findAll();
    System.out.println("\n==============> 1. Tracker..");
    for (Tracker temp : visits) {
        System.out.println(temp);
    }
    System.out.println("Tracker.findAll(),  End OK!");
    return new ResponseEntity<>(visits, HttpStatus.OK);
  }

  @RequestMapping(value = "/api/saveVisit",  method={RequestMethod.POST})
  public ResponseEntity<List<Tracker>> save(@RequestBody Tracker visit) {
    visit.setDateCreated(Instant.now());
    System.out.println("1.===visit===");
    System.out.println(visit);
    System.out.println("2.===visit===");
    repository.save(visit);
    List<Tracker> visits = repository.findAll();
    System.out.println("\n==============> 2. Tracker..");
    //for (Tracker temp : visits) {
        System.out.println("" + visits.size());
    //}
    System.out.println("\n==============> 2. Tracker..");
    System.out.println("Tracker.findAll()  End OK!");
    return new ResponseEntity<>(visits, HttpStatus.OK);
  }
}