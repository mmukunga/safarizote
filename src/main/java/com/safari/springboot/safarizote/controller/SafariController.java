package com.safari.springboot.safarizote.controller;

import java.util.List;

import com.safari.springboot.safarizote.model.Safari;
import com.safari.springboot.safarizote.repository.SafariRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SafariController {

  @Autowired
  private SafariRepository repository;

  @RequestMapping(value="/api/safaris", method=RequestMethod.GET)
  public ResponseEntity<List<Safari>> getSafaris() {
    List<Safari> safaris = this.repository.findAll();
    return new ResponseEntity<>(safaris, HttpStatus.OK);
  }

  @RequestMapping(value="/api/updateAll", method=RequestMethod.POST)
  public ResponseEntity<List<Safari>> updateAll(@RequestBody List<Safari> safaris) {
    System.out.println("updateAll Start..");
    safaris.forEach((safari) -> {
      System.out.print(safari.getPrice() + ", ");
    });
    System.out.println();
    List<Safari> dbList = repository.saveAll(safaris);
    System.out.println("updateAll dbList.size().." + dbList.size());
    List<Safari> list = this.repository.findAll();
    System.out.println("updateAll End OK!");
    return new ResponseEntity<>(list, HttpStatus.OK);
  }  
}