package com.example.demo.controller;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;
import java.util.Optional;

import com.example.demo.model.Customer;
import com.example.demo.repository.CustomerRepository;

@RestController
@RequestMapping("/api")
class CustomerController {
    
    @Autowired
    private CustomerRepository repository;
    
    private final Logger log = LoggerFactory.getLogger(CustomerController.class);

    public CustomerController(CustomerRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/users")
    Collection<Customer> users() {
        return repository.findAll();
    }

    @GetMapping("/user/{id}")
    ResponseEntity<?> getCustomer(@PathVariable Long id) {
        Optional<Customer> user = repository.findById(id);
        return user.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/user")
    ResponseEntity<Customer> createCustomer(@RequestBody Customer user) throws URISyntaxException {
        log.info("Request to create user: {}", user);
        Customer result = repository.save(user);
        return ResponseEntity.created(new URI("/api/user/" + result.getId()))
                .body(result);
    }

    @PutMapping("/user/{id}")
    ResponseEntity<Customer> updateCustomer(@RequestBody Customer user) {
        log.info("Request to update user: {}", user);
        Customer result = repository.save(user);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/user/{id}")
    public ResponseEntity<?> deleteCustomer(@PathVariable Long id) {
        log.info("Request to delete user: {}", id);
        repository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}