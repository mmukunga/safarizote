package com.example.safarizote.controller;

import java.util.Date;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestMethod;

import com.example.safarizote.model.Customer;
import com.example.safarizote.repository.CustomerRepository;

@RestController
public class CustomerController { 
  @Autowired
  private CustomerRepository repository;

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