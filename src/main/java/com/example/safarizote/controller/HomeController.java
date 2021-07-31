package com.example.safarizote.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.example.safarizote.model.Safari;
import com.example.safarizote.repository.SafariRepository;

@RestController
public class HomeController { 
  @Autowired
  private SafariRepository repository;

  @RequestMapping(value = "/api/safaris",  method={RequestMethod.GET})
  public ResponseEntity<List<Safari>> findSafaris(HttpServletRequest request){
    List<Safari> sourceSet = repository.findAll();

    System.out.println("Simple Java Safari for-loop Example.");
    System.out.println(request.getRemoteAddr());
    System.out.println("HomeController.findSafaris() SIZE:= " + sourceSet.size());
    System.out.println("findSafaris() End OK!");

    return new ResponseEntity<>(sourceSet, HttpStatus.OK);
  }
}