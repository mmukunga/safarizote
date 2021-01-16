package com.example.safarizote.repository;

import java.io.InputStream;
import java.io.InputStreamReader;
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

        String fileName = "countries.json";  
        ClassLoader classLoader = getClass().getClassLoader();
        try (InputStream is = classLoader.getResourceAsStream(fileName);
        Reader reader = new InputStreamReader(is, StandardCharsets.UTF_8)) {
            Gson gson = new Gson();
            Country[] countries = gson.fromJson(reader, Country[].class);   
            Arrays.stream(countries).forEach( e -> {
                List<City> cities = new ArrayList<>(); 
                repository.save(Country.builder()
                .name(e.getName()).code(e.getCode())
                .cities(cities).build());  
                System.out.println("!!!CountryLoader Country.. 1");              
                System.out.println(e);  
                System.out.println("!!!CountryLoader Country.. 2");
            });
        } 
        
        String fileCityName = "cities.json"; 
        ClassLoader classCityLoader = getClass().getClassLoader();

        try (InputStream is = classCityLoader.getResourceAsStream(fileCityName);
        Reader reader = new InputStreamReader(is, StandardCharsets.UTF_8)) {
            Gson gson = new Gson();
            City[] cities = gson.fromJson(reader, City[].class); 
            Arrays.stream(cities).forEach( city -> {
                Country country = repository.findByCode(city.getCountry());
                country.getCities().add(city);
                repository.save(country); 
                System.out.println("!!!CountryLoader City.. 1");                 
                System.out.println(city);  
                System.out.println("!!!CountryLoader City.. 2");   
            });
        }
    
        repository.findAll().forEach((country) -> {
            logger.info("{}", country.getName());
        });


        System.out.println("CountryLoader Countries.. END OK!!!!");  

    }
}