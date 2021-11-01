package com.example.safarizote.controller;

import java.util.List;
import java.time.Instant;
import java.io.IOException;

import org.springframework.http.ResponseEntity;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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
      return ResponseEntity.ok().body(status);
  }

  @GetMapping("/api/allHits")
  public ResponseEntity<List<Metrics>> findAll() {
    List<Metrics> visits = repository.findAll();
    return ResponseEntity.ok().body(visits);
  }

  @PostMapping("/api/saveVisit")
  public ResponseEntity<List<Metrics>> save(@RequestBody Metrics metrics) throws IOException {
    metrics.setDateCreated(Instant.now());
    if (!metrics.getHostname().contains("googlebot.com")){
      repository.save(metrics);
    }
 
    List<Metrics> visits = repository.findAll();
    return ResponseEntity.ok().body(visits);
  }
}