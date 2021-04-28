package com.example.safarizote.utils;

import java.io.InputStream;
import java.io.BufferedReader;
import java.io.InputStreamReader;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import java.net.URL;
import java.util.Scanner;

import org.springframework.stereotype.Component;


import com.example.safarizote.model.City;
import com.example.safarizote.model.Country;


import com.google.gson.Gson;
import com.google.gson.stream.JsonReader;
import java.io.Reader;
import java.nio.charset.StandardCharsets;

import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;

@Component
public class WeatherClient {
    @Autowired
    ResourceLoader resourceLoader;

    public List<City> getCities(String path, String countryCode) throws Exception {
        System.out.println("CountryLoader - path:= " + path);
        Resource resource = resourceLoader.getResource("classpath:city_list.json");
        InputStream inputStream = resource.getInputStream();
        
        JsonReader reader = new JsonReader(new InputStreamReader(inputStream));
        List<City> cities = new ArrayList<>();
        long start = System.currentTimeMillis();

        try {
            reader.beginArray();
            while (reader.hasNext()) {
            City e = new Gson().fromJson(reader, City.class);
            if (e.getCountry().equals(countryCode)) {
                cities.add(e);
            }
            }
            reader.endArray();
        } finally {
            try {
                if (reader != null) {
                    reader.close();
                }
            } catch (IOException e) {
                // let it go.
                System.out.println(e);
            }
        }
        
        long end = System.currentTimeMillis();
        float sec = (end - start) / 1000F; 
        System.out.println("CountryLoader - TimeTaken:=" + sec + " seconds");
        return cities;
    }
}