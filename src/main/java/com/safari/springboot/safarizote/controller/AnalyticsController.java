package com.safari.springboot.safarizote.controller;

import com.safari.springboot.safarizote.model.Analytics;
import com.safari.springboot.safarizote.repository.AnalyticsRepository;

import java.time.Instant;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AnalyticsController {
    @Autowired
    private AnalyticsRepository repository;

    @RequestMapping(value = "/api/fetchAnalytics", method = RequestMethod.GET)
    public ResponseEntity<List<Analytics>> fetchAnalytics() {
        List<Analytics> list = repository.findAll();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/findByIPv4", method = RequestMethod.POST)
    public ResponseEntity<List<Analytics>> findByIPv4(@RequestParam String ipv4) {
        System.out.println("1.findByIPv4. Start");
        System.out.println(ipv4);
        List<Analytics> analytics = repository.findByIpv4(ipv4);
        System.out.println("2.findByIPv4");
        System.out.println(analytics);
        System.out.println("3.findByIPv4");
        return new ResponseEntity<>(analytics, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/saveAnalytics", method = RequestMethod.POST)
    public ResponseEntity<Analytics> saveAnalytics(@RequestBody Map<String, String> map) throws Exception {
        System.out.println("1.saveAnalytics. Start");
        System.out.println(map);
        Analytics analytics = Analytics.builder()
            .id(Long.parseLong(map.get("id")))
            .ipv4(map.get("IPv4"))
            .countryName(map.get("country_name"))
            .countryCode(map.get("country_code"))
            .city(map.get("city"))
            .postal(map.get("postal"))
            .latitude(map.get("latitude"))
            .longitude(map.get("longitude"))
            .state(map.get("state"))
            .dateCreated(Instant.now())
            .build();
        System.out.println(analytics);
        System.out.println("2.saveAnalytics");
        Instant now = Instant.now();
        System.out.println(now);
        System.out.println("3.saveAnalytics");
        Analytics temp = repository.save(analytics);
        System.out.println(temp);
        System.out.println("4.analytics OK!");
        return new ResponseEntity<>(temp, HttpStatus.OK);
    }
}
