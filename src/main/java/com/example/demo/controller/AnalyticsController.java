package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.model.Analytics;
import com.example.demo.repository.AnalyticsRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.http.HttpHeaders;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
public class AnalyticsController {

    @Autowired
    private AnalyticsRepository repository;

    @GetMapping("/api/healthCheck")
    public ResponseEntity<String> healthCheck() {
        String status = "healthCheck: OK!!";
        return ResponseEntity.ok().body(status);
    }

    @GetMapping(value = "/api/getAnalytics")
    public ResponseEntity<List<Object[]>> getAnalytics() {
        Instant dateCreated = Instant.parse("2012-02-06T18:01:55.648475Z");
        List<Object[]> reports = repository.getByDateCreated(dateCreated);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Responded", "AnalyticsController");
        return new ResponseEntity<>(reports, headers, HttpStatus.OK);
    }

    @PostMapping(value = "/api/saveAnalytics")
    public ResponseEntity<List<Analytics>> saveAnalytics(@RequestBody Object obj) {
        ObjectMapper oMapper = new ObjectMapper();
        Map<String, Object> map = oMapper.convertValue(obj, new TypeReference<Map<String, Object>>() {
        });
        Analytics analytics = Analytics.builder()
                .pageview((String) map.get("pageView"))
                .iPv4((String) map.get("IPv4"))
                .city((String) map.get("city"))
                .countryCode((String) map.get("country_code"))
                .countryName((String) map.get("country_name"))
                .latitude((Double) map.get("latitude"))
                .longitude((Double) map.get("longitude"))
                .postal((String) map.get("postal"))
                .state((String) map.get("state"))
                .quantity((Integer) map.get("quantity"))
                .dateCreated(Instant.now())
                .build();
        Set<Analytics> criteria = repository.findByPageview(analytics.getPageview());
        Boolean itemFound = false;
        for (Analytics item : criteria) {
            if (item.getIPv4().equals(analytics.getIPv4()) &&
                    item.getPageview().equals(analytics.getPageview())) {
                itemFound = true;
                item.setQuantity(item.getQuantity() + 1);
                item.setDateCreated(Instant.now());
                repository.save(item);
            }
        }
        if (!itemFound) {
            repository.save(analytics);
        }

        HttpHeaders headers = new HttpHeaders();
        headers.add("Responded", "AnalyticsController");
        return new ResponseEntity<>(repository.findAll(), headers, HttpStatus.OK);
    }
}