package com.safari.springboot.safarizote.utils;

import com.safari.springboot.safarizote.model.Rating;
import com.safari.springboot.safarizote.repository.RatingRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class RatingsBuilder implements CommandLineRunner {
    @Autowired
    private RatingRepository repository;

    @Override
    public void run(String... args) throws Exception {  
        
        if (!repository.findAll().isEmpty()){
           return;
        }
        
        this.repository.save(Rating.builder()
        .stars(1)
        .description("Garbage")
        .count(getRandom())
        .build()); 
        this.repository.save( Rating.builder()
        .stars(2)
        .description("Pull Socks")
        .count(getRandom())
        .build());
        this.repository.save(Rating.builder()
        .stars(3)
        .description("Fair")
        .count(getRandom())
        .build());
        this.repository.save(Rating.builder()
        .stars(4)
        .description("Very Good")
        .count(getRandom())
        .build());
        this.repository.save( Rating.builder()
        .stars(5)
        .description("Excellent")
        .count(getRandom())
        .build());
    }

    public int getRandom() {
        int min = 0; 
        int max = 3;
        return (int) ((Math.random() * (max - min)) + min);
    }
}