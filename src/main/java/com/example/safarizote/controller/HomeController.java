package com.example.safarizote.controller;

import java.util.Date;
import java.util.List;
import java.time.Instant;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import javax.servlet.http.HttpServletRequest;
import java.util.Enumeration;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;

import com.example.safarizote.model.Tracker;
import com.example.safarizote.repository.TrackerRepository;

@RestController
public class HomeController { 
  @Autowired
  private TrackerRepository repository;

    @RequestMapping(value = "/api/allHits",  method={RequestMethod.GET})
    public ResponseEntity<List<Tracker>> findAll() {
        System.out.println("Hello, the time at the server is now " + new Date());
        List<Tracker> visits = repository.findAll();
        System.out.println("Hello, the time at the server is now " + new Date());
        System.out.println("findSafaris() End OK!");
        return new ResponseEntity<>(visits, HttpStatus.OK);
    }

    @RequestMapping(value = "/api/saveVisit",  method={RequestMethod.POST})
    public void save(@RequestBody Tracker visit) {
        repository.save(visit);
    }
}