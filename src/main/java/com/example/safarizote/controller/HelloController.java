package com.example.safarizote.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
public class HelloController { @Autowired
    private CustomerRepository repository;

    @GetMapping("/api/hello")
    public String hello() {
        return "Hello, the time at the server is now " + new Date() + "\n";
    }

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
  

}