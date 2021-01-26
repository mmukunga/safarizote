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
        List<String> cList = new ArrayList<>();
            cList.add("AF");
            cList.add("AL");
            cList.add("DZ");
            cList.add("KE");
            cList.add("NO");
            cList.add("SE");
            cList.add("DK");
        
            List<String> aList = new ArrayList<>();
        if (repository.count() > 0) {
           //getNew countries
           List<Country> lst = repository.findAll();
           System.out.println("\n==============> 2. New Enhanced For loop Example..");
           for (Country temp : lst) {
              if (!cList.contains(temp.getCode())){ 
                  aList.add(temp.getCode());
                 System.out.println(temp);
              }
           }
        } else {
            aList.addAll(cList);
        }
        
        if (aList.isEmpty()) {
            return;
        }

        String fileCountryName = "countries.json";  
        ClassLoader classLoader = getClass().getClassLoader();
        InputStream isCountry = classLoader.getResourceAsStream(fileCountryName);     
        Reader countryReader = new InputStreamReader(isCountry, StandardCharsets.UTF_8);
        Gson gsonCountry = new Gson();
        
        Country[] countries = gsonCountry.fromJson(countryReader, Country[].class);   
        Arrays.stream(countries).forEach(country -> {
            if (aList.contains(country.getCode())) {
                repository.save(Country.builder().name(country.getName())
                .code(country.getCode()).build()); 
            }
        });
       
        String fileCityName = "cities.json"; 
        ClassLoader classCityLoader = getClass().getClassLoader();
        InputStream isCity = classCityLoader.getResourceAsStream(fileCityName);
        Reader cityReader = new InputStreamReader(isCity, StandardCharsets.UTF_8);
        Gson gson = new Gson();
        City[] cities = gson.fromJson(cityReader, City[].class); 
        Arrays.stream(cities).forEach(city -> {
            Country country = repository.findByCode(city.getCountry());
            if (country != null) {
                System.out.println("CountryLoader.. Name:= " + country.getName() + " Code:= " + city.getCountry());
                if (aList.contains(country.getCode())) {
                    System.out.println("NEW City: " + city);
                    country.getCities().add(city);
                    repository.save(country); 
                }
            }
        });
        
        repository.findAll().forEach((country) -> {
            logger.info("{}", country.getName());
        });  
       
    }
}