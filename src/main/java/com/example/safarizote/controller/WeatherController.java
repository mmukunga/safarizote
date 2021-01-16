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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@RestController
public class WeatherController {
    @Autowired
    private CountryRepository repository;
    
    @RequestMapping(value = "/api/countries",  method={RequestMethod.GET})       
    public ResponseEntity<List<Country>> getCountries() { 
        System.out.println("Countries..");    
        List<Country> countries = repository.findAll();
        System.out.println("==============> 1. Simple For loop Example.");
        for (int i = 0; i < countries.size(); i++) {
            System.out.println(countries.get(i));
        } 
        //System.out.println("Countries:=" + countries.size());    
        return new ResponseEntity<>(countries, HttpStatus.OK);
    }

    @RequestMapping(value="/api/cities",  method={RequestMethod.POST})       
    public ResponseEntity<List<City>> getCities(@RequestBody Country country) { 
        System.out.println("Cities..");       
        System.out.println("Country:=" + country);
        Country temp = repository.findByName(country.getName());
        System.out.println("DBCountry:=" + temp);    
        List<City> cities = temp.getCities(); 
        System.out.println("Cities Size:= " + cities.size()); 
        System.out.println("==============> 1. Simple For loop Example.");
        for (int i = 0; i < cities.size(); i++) {
            System.out.println(cities.get(i));
        }
        return new ResponseEntity<>(cities, HttpStatus.OK);   
    }


}    