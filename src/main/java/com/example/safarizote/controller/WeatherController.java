package com.example.safarizote.controller;

import java.util.ArrayList;
import java.util.List;

import com.example.safarizote.model.City;
import com.example.safarizote.model.Country;
import com.example.safarizote.repository.CountryRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@RestController
public class WeatherController {
    @Autowired
    private CountryRepository repository;
    
    @RequestMapping(value="/api/getCountries",  method={RequestMethod.GET})       
    public ResponseEntity<List<Country>> getCountries() { 
        System.out.println("Countries..");    
        //List<Country> countries = repository.findAll();  
        List<Country> countries = new ArrayList<>();   
        Country temp = Country.builder()
        .name("kENYA").code("KE")
        .cities(new ArrayList<City>()).build();
        countries.add(temp);
        //System.out.println("Countries:=" + countries.size());    
        return new ResponseEntity<>(countries, HttpStatus.OK);
    }
}    