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
import com.example.safarizote.utils.GoogleAnalytics;
import com.google.api.services.analyticsreporting.v4.model.GetReportsResponse;

@RestController
public class MetricsController { 
  @Autowired
  private MetricsRepository repository;
  
  @Autowired
	private GoogleAnalytics gaService;

  @GetMapping("/api/healthCheck")
  public ResponseEntity<String> healthCheck() {
      String status = "healthCheck: OK!!";
      return ResponseEntity.ok().body(status);
  }

  @GetMapping("/api/allHits")
  public ResponseEntity<GetReportsResponse> findAll() throws Exception {
    //List<Metrics> visits = repository.findAll();
    GetReportsResponse response = gaService.getGAData();
    System.out.println(response);
    return ResponseEntity.ok().body(response);
  }

  @PostMapping("/api/saveVisit")
  public ResponseEntity<List<Metrics>> save(@RequestBody Metrics metrics) throws IOException {
    System.out.println(metrics);
    metrics.setDateCreated(Instant.now());
    if (!metrics.getHostname().contains("googlebot.com")){
      repository.save(metrics);
    }
 
    List<Metrics> visits = repository.findAll();
    return ResponseEntity.ok().body(visits);
  }
}