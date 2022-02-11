package com.example.safarizote.controller;

import java.time.Instant;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.safarizote.model.Shopping;
import com.example.safarizote.repository.ShoppingRepository;

@RestController
public class ShoppingController {
  @Autowired
  private ShoppingRepository repository;

  @GetMapping("/api/shoppings")
  public ResponseEntity<List<Shopping>> shopping() {
    List<Shopping> shoppings = repository.findAll();
    return ResponseEntity.ok().body(shoppings);
  }

  @PostMapping("/api/getByShop")
  public ResponseEntity<Set<Shopping>> findByShop(@RequestBody Map<String, String> map) {
    String shop = (String) map.get("shop");
    Set<Shopping> shoppings = repository.findByShop(shop);
    // shoppings.forEach(System.out::println);
    return ResponseEntity.ok().body(shoppings);
  }

  @PostMapping(value = "/api/shoppings")
  public ResponseEntity<?> insertShopping(@RequestParam Map<String, String> map) throws Exception {
    double price = Double.valueOf((String) map.get("price"));
    Shopping shopping = Shopping.builder()
        .product((String) map.get("product"))
        .shop((String) map.get("shop"))
        .price(price)
        .dateCreated(Instant.now())
        .build();

    Shopping s = repository.save(shopping);
    Optional<Shopping> sh = repository.findById(s.getId());
    if (!sh.isPresent()) {
      return ResponseEntity.notFound().build();
    } else {
      List<Shopping> shoppings = repository.findAll();
      return ResponseEntity.ok().body(shoppings);
    }
  }

  @DeleteMapping(value = "/api/shoppings/{id}")
  public ResponseEntity<Shopping> deleteShopping(@PathVariable("id") Long id) {
    repository.deleteById(id);
    return ResponseEntity.ok().build();
  }

}