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
import com.example.safarizote.utils.IGAService;
import com.google.api.services.analytics.model.GaData;

@RestController
public class MetricsController { 
  @Autowired
  private MetricsRepository repository;
  @Autowired
	private IGAService gaService;

  @GetMapping("/api/healthCheck")
  public ResponseEntity<GaData> healthCheck() throws Exception {
      String status = "healthCheck: OK!!";
      System.out.println(status);
      GaData ga = gaService.getGAData();
      System.out.println(ga);
      return ResponseEntity.ok().body(ga);
  }

  @GetMapping("/api/allHits")
  public ResponseEntity<List<Metrics>> findAll() {
    List<Metrics> visits = repository.findAll();
    return ResponseEntity.ok().body(visits);
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