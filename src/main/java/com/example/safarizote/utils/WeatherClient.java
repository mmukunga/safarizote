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

@Component
public class WeatherClient {

    public List<City> getCities(String path) throws Exception {
        System.out.println("CountryLoader - path:= " + path);
        Resource resource = resourceLoader.getResource("classpath:city_list.json");
        InputStream inputStream = resource.getInputStream();
        JsonReader reader = new JsonReader(new InputStreamReader(inputStream));
        List<City> cities = new ArrayList<>();

        long start = System.currentTimeMillis();
        reader.beginArray();
        while (reader.hasNext()) {
          City e = new Gson().fromJson(reader, City.class);
          //System.out.println(Person);
          cities.add(e);
        }

        reader.endArray();
        long end = System.currentTimeMillis();
        float sec = (end - start) / 1000F; 
        System.out.println("CountryLoader - TimeTaken:=" + sec + " seconds");
        return cities;
    }
}