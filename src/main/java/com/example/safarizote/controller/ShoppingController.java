package com.example.safarizote.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.safarizote.model.Shopping;
import com.example.safarizote.repository.ShoppingRepository;

@RestController
public class ShoppingController { 
  @Autowired
  private ShoppingRepository repository;

  @GetMapping("/api/shopping")
  public ResponseEntity<List<Shopping>> shopping(){
    List<Shopping> sourceSet = repository.findAll();
    return ResponseEntity.ok().body(sourceSet);
  }

  @PostMapping(value="/api/newShopping",
               consumes={"application/json","application/xml"},
			         produces={"application/json","application/xml"})
	public ResponseEntity<Shopping> insertShopping(@RequestBody Shopping shopping) {
		Shopping s = repository.save(shopping);
		shopping.setId(s.getId());
    Optional<Shopping> sdb = repository.findById(s.getId());
    if (!sdb.isPresent()) {
			return ResponseEntity.notFound().build();
		} else {
			return ResponseEntity.ok().build();
		}
	}

}