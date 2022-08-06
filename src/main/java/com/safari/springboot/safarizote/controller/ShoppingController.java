package com.safari.springboot.safarizote.controller;

import java.util.Arrays;
import java.util.List;
import com.safari.springboot.safarizote.model.Shopping;
import com.safari.springboot.safarizote.repository.ShoppingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ShoppingController {

    @Autowired
    private ShoppingRepository repository;

    @RequestMapping(value="/api/products", method=RequestMethod.GET)
    public ResponseEntity<List<Shopping>> getProducts() {
        List<Shopping> shoppings = this.repository.findAll();
        return new ResponseEntity<>(shoppings, HttpStatus.OK);
    }

    @RequestMapping(value="/api/saveProducts", method=RequestMethod.POST)
    public ResponseEntity< List<Shopping>> saveShopping(@RequestBody Shopping[] shoppings ) {
        List<Shopping> targetList = Arrays.asList(shoppings);
        this.repository.saveAll(targetList);
        List<Shopping> updatedList = this.repository.findAll();
        return new ResponseEntity<>(updatedList, HttpStatus.OK);
    }
}