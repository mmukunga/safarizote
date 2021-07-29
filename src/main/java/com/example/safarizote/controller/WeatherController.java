package com.example.safarizote.controller;

import java.util.List;
import java.util.ArrayList;
import java.util.Set;
import java.util.HashSet;
import java.util.Collections;
import java.net.URI;

import com.example.safarizote.model.City;
import com.example.safarizote.model.ICity;
import com.example.safarizote.model.Country;
import com.example.safarizote.model.ICountry;
import com.example.safarizote.repository.CityRepository;
import com.example.safarizote.repository.CountryRepository;
import com.example.safarizote.utils.WeatherClient;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.client.RestTemplate;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.core.ParameterizedTypeReference;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;


import com.google.gson.Gson;
import com.google.gson.stream.JsonReader;
import java.io.Reader;
import java.nio.charset.StandardCharsets;

@RestController
public class WeatherController {
    private static final String API_KEY = "6ab73f3655f1a0db55237e9f5b00bff9";
    private static String BASE_URL = "http://api.openweathermap.org/data/2.5/weather?q=";
    private static String FORECAST_URL = "http://api.openweathermap.org/data/2.5/forecast/daily?q=";
    private static String IMG_URL = "http://openweathermap.org/img/w/";

    @Autowired
    private CountryRepository repository;
    @Autowired
    private CityRepository cityReository;
    @Autowired
    private WeatherClient weatherClient;

    @RequestMapping(value = "/api/countries",  method={RequestMethod.GET})       
    public ResponseEntity<List<ICountry>> getCountries() throws Exception { 
        List<Country> countries = repository.findAll();  

        URI uri = new URI("https://api.countrystatecity.in/v1/countries");
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-CSCAPI-KEY", "R3VrWVYzUWVtbHNjOGFEbGNhM3Rhb1dZcGpnQ3pQQkV3WlBPMmZHbA==");   
        HttpEntity<?> requestEntity = new HttpEntity<>(null, headers);
        ResponseEntity<List<ICountry>> responseEntity = restTemplate.exchange(uri, HttpMethod.GET, requestEntity, 
           new ParameterizedTypeReference<List<ICountry>>(){});

        System.out.println("10.WeatherController getCountries()..");
        System.out.println(responseEntity);
        System.out.println("20.WeatherController getCountries()..");
        List<ICountry> result = responseEntity.getBody();
        System.out.println(result);
        System.out.println("30.WeatherController getCountries()..");

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @RequestMapping(value="/api/cities",  method={RequestMethod.POST})       
    public ResponseEntity<List<ICity>> getCities(@RequestBody Country country) throws Exception { 

        String ciso = "KE";

        URI uri = new URI("https://api.countrystatecity.in/v1/countries/"+ciso+"/cities");
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-CSCAPI-KEY", "R3VrWVYzUWVtbHNjOGFEbGNhM3Rhb1dZcGpnQ3pQQkV3WlBPMmZHbA==");   
        HttpEntity<?> requestEntity = new HttpEntity<>(null, headers);
        ResponseEntity<List<ICity>> responseEntity = restTemplate.exchange(uri, HttpMethod.GET, requestEntity, 
           new ParameterizedTypeReference<List<ICity>>(){});

        System.out.println("10.WeatherController getCities()..");
        System.out.println(responseEntity);
        System.out.println("20.WeatherController getCities()..");
        List<ICountry> result = responseEntity.getBody();
        System.out.println(result);
        System.out.println("30.WeatherController getCities()..");


        List<City> countryCities = new ArrayList<>(); 
        String jsonFile = "city_list.json";
        List<City> cityList = weatherClient.getCities(jsonFile, country.getCode());
        System.out.println("WeatherController - cityList:= " + cityList.size());  
        return new ResponseEntity<>(result, HttpStatus.OK);   
    }

    @RequestMapping(value = "/api/weather",  method={RequestMethod.POST})
    public ResponseEntity<String> getWeatherData(@RequestBody Country country) throws IOException {
        HttpURLConnection con = null ;
        InputStream is = null;
        String location = country.getName() + "," + country.getCode();
        
        con = (HttpURLConnection) ( new URL(BASE_URL + location + "&cnt=7" + "&units=metric" + "&APPID="+API_KEY)).openConnection();
        con.setRequestMethod("GET");
        con.setDoInput(true);
        con.setDoOutput(true);
        con.connect();
        // Let's read the response
        StringBuffer buffer = new StringBuffer();
        is = con.getInputStream();
        BufferedReader br = new BufferedReader(new InputStreamReader(is));
        String line = null;
        while (  (line = br.readLine()) != null )
            buffer.append(line + "\r\n");

        is.close();
        con.disconnect(); 
        return new ResponseEntity<>(buffer.toString(), HttpStatus.OK);

    }

    @RequestMapping(value = "/api/forecast",  method={RequestMethod.POST})
    public ResponseEntity<String> getWeatherForecast(@RequestBody Country country) throws IOException {
        HttpURLConnection con = null ;
        InputStream is = null;
        String location = country.getName()+","+country.getCode();
        
        con = (HttpURLConnection) ( new URL(FORECAST_URL + location + "&units=metric" + "&APPID="+API_KEY)).openConnection();
        con.setRequestMethod("GET");
        con.setDoInput(true);
        con.setDoOutput(true);
        con.connect();
        // Let's read the response
        StringBuffer buffer = new StringBuffer();
        is = con.getInputStream();
        BufferedReader br = new BufferedReader(new InputStreamReader(is));
        String line = null;
        while (  (line = br.readLine()) != null )
            buffer.append(line + "\r\n");

        is.close();
        con.disconnect();
        return new ResponseEntity<>(buffer.toString(), HttpStatus.OK);
    }

    public byte[] getImage(String code) throws IOException {
        HttpURLConnection con = null ;
        InputStream is = null;
       
        con = (HttpURLConnection) ( new URL(IMG_URL + code)).openConnection();
        con.setRequestMethod("GET");
        con.setDoInput(true);
        con.setDoOutput(true);
        con.connect();

        // Let's read the response
        is = con.getInputStream();
        byte[] buffer = new byte[1024];
        ByteArrayOutputStream baos = new ByteArrayOutputStream();

        while ( is.read(buffer) != -1)
            baos.write(buffer);

        return baos.toByteArray();
      
    }
}    