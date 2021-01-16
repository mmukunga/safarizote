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

    @Autowired
    private CountryRepository cityRepository;

    @Override
    public void run(String... args) throws Exception {
    //    System.out.println("CountryLoader Countries.. START!!!!");  
/*
        if (repository.count() > 0) {
            return;
        }
*/
/*
        if (repository.count() == 0) {
            String fileName = "countries.json";
            System.out.println("CountryLoader Countries..1");  
            ClassLoader classLoader = getClass().getClassLoader();
            System.out.println("CountryLoader Countries..2");  
            try (InputStream is = classLoader.getResourceAsStream(fileName);
            Reader reader = new InputStreamReader(is, StandardCharsets.UTF_8)) {
                Gson gson = new Gson();
                System.out.println("CountryLoader Countries..3");  
                Country[] countries = gson.fromJson(reader, Country[].class);   
                Arrays.stream(countries).forEach( e -> {
                    List<City> cities = new ArrayList<>();
                    System.out.println("CountryLoader Countries..4");  
                    repository.save(Country.builder()
                    .name(e.getName()).code(e.getCode())
                    .cities(cities).build());                
                    System.out.println(e);  
                });
            } 
        } else {
            System.out.println("CountryLoader Countries..NOT EMPTY!!!");  
        }
*/
 //       System.out.println("CountryLoader Countries.. CONT!!!!");  
 //       System.out.println("CountryLoader Cities..SIZE!!!" + cityRepository.count()); 
          System.out.println("!!!CountryLoader Countries.. CONT!!!!  "  + cityRepository.count());  
 //       if (cityRepository.count() == 0) {
            String fileCityName = "cities.json";
            System.out.println("CountryLoader Cities..1");  
            ClassLoader classCityLoader = getClass().getClassLoader();
            System.out.println("CountryLoader Cities..2"); 
            try (InputStream is = classCityLoader.getResourceAsStream(fileCityName);
            Reader reader = new InputStreamReader(is, StandardCharsets.UTF_8)) {
                Gson gson = new Gson();
                City[] cities = gson.fromJson(reader, City[].class);   
                System.out.println("CountryLoader Cities..3"); 
                Arrays.stream(cities).forEach( city -> {
                    Country country = repository.findByCode(city.getCountry());
                    System.out.println("CountryLoader Cities..4"); 
                    country.getCities().add(city);
                    repository.save(country);                
                    System.out.println(city);   
                });
            }
    /*    } else {
            System.out.println("Cities..ONT EMPTY!!!"); 
        }
    */
        repository.findAll().forEach((country) -> {
            logger.info("{}", country.getName());
        });


        System.out.println("CountryLoader Countries.. END OK!!!!");  

    }
}