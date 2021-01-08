package com.example.safarizote.controller;
 
import java.util.List;
import java.util.ArrayList;
import java.util.Set;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.safarizote.model.Customer;
import com.example.safarizote.repository.CustomerRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
 
@RestController
@CrossOrigin
public class AboutUsController {

  @Autowired
  private CustomerRepository repository;

  @CrossOrigin(origins = "*")
  @RequestMapping(value = "/api/customers",  method={RequestMethod.GET})
  public ResponseEntity<List<Customer>> customers(){
    System.out.println("1. findAll()");
    List<Customer> sourceSet = repository.findAll();
    System.out.println("2. findAll()");
    System.out.println("==============> 1. Simple For loop Example.");
    for (int i = 0; i < sourceSet.size(); i++) {
        System.out.println(sourceSet.get(i));
    }
    return new ResponseEntity<>(sourceSet, HttpStatus.OK);
  }
  
  @RequestMapping(value="/api/customerById", method=RequestMethod.GET)
  public ResponseEntity<Optional<Customer>> customerById(@RequestParam("id") Long id){
    Optional<Customer> result = repository.findById(id);
    return new ResponseEntity<>(result, HttpStatus.OK);
  }
  
  @RequestMapping(value="/api/customerByName", method=RequestMethod.GET)
  public ResponseEntity<List<Customer>> customerByName(@RequestParam("name") String name){ 
    Set<Customer> sourceSet = repository.findByName(name);
    List<Customer> targetList = new ArrayList<>(sourceSet);
    return new ResponseEntity<>(targetList, HttpStatus.OK);
  }
}