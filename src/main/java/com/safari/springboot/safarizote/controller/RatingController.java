package com.safari.springboot.safarizote.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.safari.springboot.safarizote.model.Rating;
import com.safari.springboot.safarizote.repository.RatingRepository;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RatingController {
    @Autowired
    private RatingRepository repository;

    @GetMapping("/api/ratings")
    public ResponseEntity<List<Rating>> getRatings() {
        List<Rating> ratings = repository.findAll();
        return new ResponseEntity<>(ratings, HttpStatus.OK);
    }

    @RequestMapping(value="/api/saveRating", method=RequestMethod.POST)
    public ResponseEntity<Rating> saveRating(@RequestBody Rating rating ) {
        Rating dbrating = repository.save(rating);
        return new ResponseEntity<>(dbrating, HttpStatus.OK);
    }

    @RequestMapping(value="/api/options", method=RequestMethod.GET)
    public ResponseEntity<String> getOptions() throws Exception {
        List<Rating> crunchifyList = repository.findAll();
        Map<String, Object> options = new HashMap<>();
        
        for (Rating temp : crunchifyList) {
            System.out.println(temp);
            options.put(temp.getDescription(), temp.getStars());
        }
       
        JSONArray arr = new JSONArray();
        for (Map.Entry<String, Object> entry : options.entrySet()) {
            String str = "{key:" + entry.getKey() + ",value:" + entry.getValue()+"}";
            JSONObject obj = new JSONObject(str);
            arr.put(obj);
        }
        
		return new ResponseEntity<>(arr.toString(), HttpStatus.OK);
    }
}