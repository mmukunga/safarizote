package com.example.safarizote.controller;

import java.util.Date;
import java.util.List;

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
public class HomeController { 
  @Autowired
  private TrackerRepository repository;
    
    @RequestMapping(value="/api/healthCheck", method=RequestMethod.POST)
    public String healthCheck() {
        System.out.println("healthCheck() , the time at the server is now " + new Date());
        return "healthCheck: OK!!";
    }

    @RequestMapping(value = "/api/allHits",  method={RequestMethod.GET})
    public ResponseEntity<List<Tracker>> findAll() {
        System.out.println("Tracker.findAll() , the time at the server is now " + new Date());
        List<Tracker> visits = repository.findAll();
        System.out.println("Tracker.findAll() , the time at the server is now " + new Date());
        System.out.println("Tracker.findAll()  End OK!");
        return new ResponseEntity<>(visits, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/saveVisit",  method={RequestMethod.POST})
    public void save(@RequestBody Tracker visit) {
        System.out.println("Tracker.findAll()  Start...");
        System.out.println(visit);
        repository.save(visit);
        System.out.println("Tracker.findAll()  End OK!");
    }
}