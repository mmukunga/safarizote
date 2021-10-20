package com.example.safarizote.controller;

import java.util.List;
import java.time.Instant;
import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.safarizote.model.Metrics;
import com.example.safarizote.repository.MetricsRepository;

@RestController
public class MetricsController { 
  @Autowired
  private MetricsRepository repository;
    
  @GetMapping("/api/healthCheck")
  public ResponseEntity<String> healthCheck() {
      String status = "healthCheck: OK!!";
      return new ResponseEntity<>(status, HttpStatus.OK);
  }

  @GetMapping("/api/allHits")
  public ResponseEntity<List<Metrics>> findAll() {
    List<Metrics> visits = repository.findAll();
    return new ResponseEntity<>(visits, HttpStatus.OK);
  }

  @GetMapping("/api/saveVisit")
  public ResponseEntity<List<Metrics>> save(@RequestBody Metrics visit) throws IOException {
    visit.setDateCreated(Instant.now());
    if (!visit.getHostname().contains("googlebot.com")){
      repository.save(visit);
    }
 
    List<Metrics> visits = repository.findAll();
    return new ResponseEntity<>(visits, HttpStatus.OK);
  }
}