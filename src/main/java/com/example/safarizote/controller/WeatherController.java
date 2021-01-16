package com.example.safarizote.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.example.safarizote.model.City;
import com.example.safarizote.model.Country;
import com.example.safarizote.model.Forecast;
import com.example.safarizote.model.Weather;
import com.example.safarizote.repository.CountryRepository;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

public class WeatherController {
    public String content;
    public String inline;
    public static String key;
    public static int responseCode;
    public static int i;
    private static final String API_KEY = "081cfe3b3ff156db70e355a1ab2abb17";

    @Autowired
    private CountryRepository repository;

    @RequestMapping(value = "/getCountries", method = RequestMethod.GET)       
    public List<Country> getCountries() {    
        return repository.findAll();    
    }

    @RequestMapping(value = "/getCities", method = RequestMethod.GET)       
    public List<City> getCities(@RequestParam String country) {    
        Country temp = repository.findByName(country);
        return temp.getCities();    
    }

    @RequestMapping(value = "/api/current",  method={RequestMethod.GET})
    public Weather current(@RequestParam(value = "location") String location) throws IOException {
        String inputLine;
        String url = "http://api.openweathermap.org/data/2.5/weather?q=city,country&APPID="+API_KEY;
        //http://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + key
        URL obj = new URL(url);
        HttpURLConnection con = (HttpURLConnection) obj.openConnection();
        responseCode = con.getResponseCode();
        BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));

        StringBuffer response = new StringBuffer();
        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }

        content = response.toString();
        
        content = response.toString();
        System.out.println(content);

        Map<String, Object> respMap = jsonToMap(content.toString());
        Map<String, Object> mainMap = jsonToMap(respMap.get("main").toString());
        Map<String, Object> windMap = jsonToMap(respMap.get("sys").toString());
        Map<String, Object> weatherMap = jsonToMap(respMap.get("weather").toString()); //ARRAY

        String LOCATION = "delhi,india";

        System.out.println("Location: " + LOCATION);
        System.out.println("Current Temperature: " + mainMap.get("temp"));
        System.out.println("Current Humidity: " + mainMap.get("humidity"));
        System.out.println("Max: " + mainMap.get("temp_min"));
        System.out.println("Min: " + mainMap.get("temp_max"));

        System.out.println("Wind Speed: " + windMap.get("speed"));
        System.out.println("Wind Angle: " + windMap.get("deg"));


        return null;

    }

    @RequestMapping(value = "/api/forecast",  method={RequestMethod.GET})
    public Forecast forecast() throws Exception {
        String inputLine;
        String url = "http://api.openweathermap.org/data/2.5/forecast?lat=55.5&lon=37.5&cnt=10&appid="+API_KEY; 
        URL obj = new URL(url);

        HttpURLConnection con = (HttpURLConnection) obj.openConnection();

        
        BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
        
        java.lang.StringBuffer response = new StringBuffer();
        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }
         
        content = response.toString();
        System.out.println(content);

        Map<String, Object> respMap = jsonToMap(content.toString());
        Map<String, Object> mainMap = jsonToMap(respMap.get("main").toString());
        Map<String, Object> windMap = jsonToMap(respMap.get("wind").toString());

        String LOCATION = "delhi,india";

        System.out.println("Location: " + LOCATION);
        System.out.println("Current Temperature: " + mainMap.get("temp"));
        System.out.println("Current Humidity: " + mainMap.get("humidity"));
        System.out.println("Max: " + mainMap.get("temp_min"));
        System.out.println("Min: " + mainMap.get("temp_max"));

        System.out.println("Wind Speed: " + windMap.get("speed"));
        System.out.println("Wind Angle: " + windMap.get("deg"));
        

        return null;
    }    

    
    public static Map<String, Object> jsonToMap(String str) {
        Map<String, Object> map = new Gson().fromJson(str, new TypeToken<HashMap<String, Object>>() {
        }.getType());
        return map;
    }

}
