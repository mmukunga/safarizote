package com.example.safarizote.controller;

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

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

import com.example.safarizote.model.Forecast;
import com.example.safarizote.model.Weather;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
public class WeatherController {
    //private static final String API_KEY = "081cfe3b3ff156db70e355a1ab2abb17";
    private static final String API_KEY = "6ab73f3655f1a0db55237e9f5b00bff9";
    private static String BASE_URL = "http://api.openweathermap.org/data/2.5/weather?q=";
    private static String IMG_URL = "http://openweathermap.org/img/w/";

    private static final Boolean openweathermap_sample = false;

    @Autowired
    private CountryRepository repository;
    
    @RequestMapping(value = "/api/countries",  method={RequestMethod.GET})       
    public ResponseEntity<List<Country>> getCountries() { 
        List<Country> countries = repository.findAll();  
        return new ResponseEntity<>(countries, HttpStatus.OK);
    }

    @RequestMapping(value="/api/cities",  method={RequestMethod.POST})       
    public ResponseEntity<List<City>> getCities(@RequestBody Country country) { 
        Country dbCountry = repository.findByCode(country.getCode());
        List<City> cities = dbCountry.getCities();
        return new ResponseEntity<>(cities, HttpStatus.OK);   
    }

    @RequestMapping(value = "/api/weather",  method={RequestMethod.POST})
    public ResponseEntity<String> getWeatherData(@RequestBody Country country) throws IOException {
        System.out.println("1.Current WEather - COUNTRY1:= " + country); 
        HttpURLConnection con = null ;
        InputStream is = null;
        String location = "Kabul, AF";
        try {
            con = (HttpURLConnection) ( new URL(BASE_URL + location + "&APPID="+API_KEY)).openConnection();
            con.setRequestMethod("GET");
            con.setDoInput(true);
            con.setDoOutput(true);
            con.connect();
            System.out.println("2.Current WEather - COUNTRY2:= " + country); 
            // Let's read the response
            StringBuffer buffer = new StringBuffer();
            is = con.getInputStream();
            BufferedReader br = new BufferedReader(new InputStreamReader(is));
            String line = null;
            while (  (line = br.readLine()) != null )
                buffer.append(line + "\r\n");

            System.out.println("3.Current WEather - COUNTRY3:= " + country); 
            is.close();
            con.disconnect();
            System.out.println("4.Current WEather - COUNTRY4:= " + country); 
            return new ResponseEntity<>(buffer.toString(), HttpStatus.OK);
        } catch(Throwable t) {
            t.printStackTrace();
        } finally {
            try { 
                is.close(); 
            } catch(Throwable t) {}
            try { 
                con.disconnect(); 
            } catch(Throwable t) {}
        }

        return new ResponseEntity<>(null, HttpStatus.OK);

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
         
        String content = response.toString();
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