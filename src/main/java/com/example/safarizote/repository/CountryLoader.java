package com.example.safarizote.repository;

import java.io.File;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import com.example.safarizote.model.City;
import com.example.safarizote.model.Country;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.io.Reader;
import java.nio.charset.StandardCharsets;

@Component
public class CountryLoader implements CommandLineRunner {
    private static final Logger logger = LoggerFactory.getLogger(CountryLoader.class);

    @Autowired
    private CountryRepository repository;

    @Override
    public void run(String... args) throws Exception {
        if (repository.count() > 0) {
            return;
        }

        Gson gson = new GsonBuilder().create();
        
        ClassLoader classLoader = getClass().getClassLoader();
        URL resource = classLoader.getResource("countries.json");
        Path path = new File(resource.getFile()).toPath();

        try (Reader reader = Files.newBufferedReader(path, 
        StandardCharsets.UTF_8)) {
            Country[] countries = gson.fromJson(reader, Country[].class);            
            Arrays.stream(countries).forEach( e -> {
                List<City> cities = new ArrayList<>();
                repository.save(Country.builder()
                  .name(e.getName()).code(e.getCode())
                  .cities(cities).build());                
                System.out.println(e);  
            });
        }

        ClassLoader classLoader2 = getClass().getClassLoader();
        URL resource2 = classLoader2.getResource("cities.json");
        Path path2 = new File(resource2.getFile()).toPath();

        try (Reader reader = Files.newBufferedReader(path2, 
        StandardCharsets.UTF_8)) {
            City[] cities = gson.fromJson(reader, City[].class);            
            Arrays.stream(cities).forEach( e -> {
                Country country = repository.findByName(e.getCountry());
                  country.getCities().add(e);
                repository.save(country);                
                System.out.println(e);  
            });
        }

        repository.findAll().forEach((country) -> {
            logger.info("{}", country);
        });
    }
}