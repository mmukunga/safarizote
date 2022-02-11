package com.example.safarizote.controller;

import java.util.Collection;
import java.util.List;
import java.util.Map;

import com.example.safarizote.model.Rating;
import com.example.safarizote.repository.RatingsRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RatingsController {
    @Autowired
    private RatingsRepository repository;

    @GetMapping("/api/ratings")
    public ResponseEntity<List<Rating>> getRatings() {
        List<Rating> ratings = repository.findAll();
        System.out.println("getRatings Ended OK!");
        return new ResponseEntity<>(ratings, HttpStatus.CREATED);
    }

    @PostMapping("/api/saveRating")
    public ResponseEntity<List<Rating>> saveRating(@RequestParam Map<String, Object> ratingsMap) throws Exception {
        Collection<Rating> allRatings = getAllRatings();
        Integer newrating = (Integer) ratingsMap.get("rating");
        for (Rating temp : allRatings) {
            if (temp.getRating() == newrating) {
                repository.save(temp);
            }
        }

        List<Rating> ratings = repository.findAll();
        System.out.println("Create..Ended OK!!");
        return new ResponseEntity<>(ratings, HttpStatus.CREATED);
    }

    public Collection<Rating> getAllRatings() {
        System.out.print("Please enter the performance rating (Excellent, Very Good, Good, Fair, or Poor):");
        System.out.println("getAllRatings Ended OK!");
        return repository.findAll();
    }
}