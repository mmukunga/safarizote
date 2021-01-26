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
        System.out.println("CountryLoader..1");
        List<String> aList = new ArrayList<>();
            aList.add("AF");
            aList.add("AL");
            aList.add("DZ");
            aList.add("KE");
            aList.add("NO");
            aList.add("SE");
            aList.add("DK");
            System.out.println("CountryLoader..2");
        if (repository.count() > 0) {
            repository.deleteAll();
        }
        System.out.println("CountryLoader..3");
        String fileCountryName = "countries.json";  
        ClassLoader classLoader = getClass().getClassLoader();
        InputStream isCountry = classLoader.getResourceAsStream(fileCountryName);     
        Reader countryReader = new InputStreamReader(isCountry, StandardCharsets.UTF_8);
        Gson gsonCountry = new Gson();
        System.out.println("CountryLoader..4");
        Country[] countries = gsonCountry.fromJson(countryReader, Country[].class);   
        Arrays.stream(countries).forEach(country -> {
            if (aList.contains(country.getCode())) {
                repository.save(Country.builder().name(country.getName())
                .code(country.getCode()).build()); 
            }
        });
       
        System.out.println("CountryLoader..5");
        String fileCityName = "cities.json"; 
        ClassLoader classCityLoader = getClass().getClassLoader();
        InputStream isCity = classCityLoader.getResourceAsStream(fileCityName);
        Reader cityReader = new InputStreamReader(isCity, StandardCharsets.UTF_8);
        Gson gson = new Gson();
        System.out.println("CountryLoader..6");
        City[] cities = gson.fromJson(cityReader, City[].class); 
        System.out.println("CountryLoader..7 cities.size():= " + cities.length);
        Arrays.stream(cities).forEach(city -> {
            System.out.println("CountryLoader..7A country:= " + city);
            System.out.println("CountryLoader..7B country:= " + city.getCountry());
            Optional<Country> country = repository.findByCode(city.getCountry());
            System.out.println("CountryLoader..7C country:= " + country);
            if (country.isPresent()) {
                System.out.println("CountryLoader..7D country:= " + country.get().getCode());
                System.out.println("CountryLoader..7D country:= " + city.getCountry());
                if (aList.contains(country.get().getCode())) {
                    System.out.println("NEW City: " + city);
                    country.get().getCities().add(city);
                    repository.save(country.get()); 
                }
            }
        });
        System.out.println("CountryLoader..6");
        repository.findAll().forEach((country) -> {
            logger.info("{}", country.getName());
        });  
        System.out.println("CountryLoader..7");
    }
}