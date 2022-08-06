package com.safari.springboot.safarizote.utils;

import com.safari.springboot.safarizote.model.Shopping;
import com.safari.springboot.safarizote.repository.ShoppingRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class ShoppingBuilder implements CommandLineRunner {
    @Autowired
    private ShoppingRepository repository;

    @Override
    public void run(String... args) throws Exception {        
        this.repository.save( Shopping.builder()
        .quantity(5)
        .product("Milk")
        .shop("Joka")
        .price(75.54)
        .build());
        this.repository.save(Shopping.builder()
        .quantity(4)
        .product("Uji")
        .shop("Nakumatt")
        .price(56.10)
        .build());
        this.repository.save(Shopping.builder()
        .quantity(3)
        .product("Mayai Boilo")
        .shop("Rema 100")
        .price(23.50)
        .build());
        this.repository.save( Shopping.builder()
        .quantity(2)
        .shop("IKEA Furuset")
        .product("Mutura Choma")
        .price(67.90)
        .build());
        this.repository.save(Shopping.builder()
        .quantity(1)
        .product("Matumbo")
        .shop("Joka")
        .price(105.00)
        .build());
    }
}