package com.safari.springboot.safarizote.controller;

import com.safari.springboot.safarizote.model.Analytics;
import com.safari.springboot.safarizote.repository.AnalyticsRepository;

import java.time.Instant;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AnalyticsController {
    @Autowired
    private AnalyticsRepository repository;

    @RequestMapping(value = "/api/fetchAnalytics", method = RequestMethod.POST)
    public ResponseEntity<List<Analytics>> fetchAnalytics() {
        List<Analytics> list = repository.findAll();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/saveAnalytics", method = RequestMethod.POST)
    public ResponseEntity<List<Analytics>> saveAnalytics(@RequestBody Analytics analytics) throws Exception {
        System.out.println("1.analytics. Start");
        System.out.println(analytics);
        System.out.println("2.analytics");
        
        Instant now = Instant.now();
        System.out.println(now);
        System.out.println("3.analytics");

        Analytics temp = repository.save(analytics);
        System.out.println(temp);
        List<Analytics> list = repository.findAll();
        System.out.println("4.analytics OK!");
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
}
