package com.example.safarizote.repository;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import com.example.safarizote.model.City;
import com.example.safarizote.model.Country;
import com.example.safarizote.utils.WeatherClient;

import com.google.gson.Gson;
import com.google.gson.stream.JsonReader;
import java.io.Reader;
import java.nio.charset.StandardCharsets;

import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;

@Component
public class CountryLoader implements CommandLineRunner {
    private static final Logger logger = LoggerFactory.getLogger(CountryLoader.class);

    @Autowired
    private CountryRepository repository;

    @Autowired
    ResourceLoader resourceLoader;

    @Autowired
    private WeatherClient weatherClient;

    @Override
    public void run(String... args) throws Exception {
        // repository.deleteAll();
        if (repository.count() > 0) {
            System.out.println("..COUNTRY TABLE NOT EMPTY!!..");
            return;
         }
        String fileCountryName = "countries.json";  

        ClassLoader classLoader = getClass().getClassLoader();
        InputStream isCountry = classLoader.getResourceAsStream(fileCountryName);     
        Reader countryReader = new InputStreamReader(isCountry, StandardCharsets.UTF_8);
        Gson gsonCountry = new Gson();
        
        Country[] countries = gsonCountry.fromJson(countryReader, Country[].class);  
        Arrays.stream(countries).forEach(country -> {
                repository.save(Country.builder().name(country.getName())
                .code(country.getCode()).build()); 
        });

        repository.findAll().forEach((country) -> {
            logger.info("{}", country.getName());
        });  
       
    }
}