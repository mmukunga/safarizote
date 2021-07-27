package com.example.safarizote.controller;

import java.util.List;
import java.util.ArrayList;
import java.util.Set;
import java.util.HashSet;
import java.util.Collections;

//import com.example.safarizote.model.City;
import com.example.safarizote.model.City;
import com.example.safarizote.model.Country;
import com.example.safarizote.repository.CityRepository;
import com.example.safarizote.repository.CountryRepository;
import com.example.safarizote.utils.WeatherClient;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

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

import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;

import com.wirefreethought.geodb.client.GeoDbApi;
import com.wirefreethought.geodb.client.net.GeoDbApiClient;
import com.wirefreethought.geodb.client.model.GeoDbInstanceType;
import com.wirefreethought.geodb.client.request.PlaceRequestType;
import com.wirefreethought.geodb.client.request.FindCountriesRequest;
import com.wirefreethought.geodb.client.request.FindPlacesRequest;
import com.wirefreethought.geodb.client.model.PopulatedPlacesResponse;
import com.wirefreethought.geodb.client.model.CountriesResponse;
import com.wirefreethought.geodb.client.model.CountryResponse;
import com.wirefreethought.geodb.client.model.CurrenciesResponse;

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
    public ResponseEntity<List<Country>> getCountries() { 
        GeoDbApiClient apiClient = new GeoDbApiClient(GeoDbInstanceType.FREE);
        GeoDbApi geoDbApi = new GeoDbApi(apiClient);
        System.out.println("1.WeatherController - getCountries()");  
        CountriesResponse countriesResponse = geoDbApi.findCountries(
            FindCountriesRequest.builder()
                .limit(5)
                .offset(0)
                .build()
        );

        System.out.println("2.WeatherController - getCountries()");  
        System.out.println(countriesResponse.getData());
        System.out.println("3.WeatherController - getCountries()"); 
        countriesResponse.getData().forEach(c -> {
            System.out.println("Country: {}" + c);
        });

        long totalCount = countriesResponse.getData().size();
        
        if (countriesResponse.getMetadata() != null) {
            totalCount = countriesResponse.getMetadata().getTotalCount();
        }

        System.out.println("Total resuls: {}" + totalCount);

        Set<String> countryCodes = new HashSet();
        countryCodes.add("KE");

        PopulatedPlacesResponse placesResponse = geoDbApi.findPlaces(
            FindPlacesRequest.builder()
                .countryId("US")
                .namePrefix("San")
                .minPopulation(100000)
                .types(Collections.singleton(PlaceRequestType.CITY))
                .build()
        );

        placesResponse.getData().forEach(c -> {
            System.out.println("Place: {}" + c);
        });

        long totalPlacesCount = placesResponse.getData().size();

        if (placesResponse.getMetadata() != null) {
            totalPlacesCount = placesResponse.getMetadata().getTotalCount();
        }

        System.out.println("TotalPlacesCount results: {}" + totalPlacesCount);


        List<Country> countries = repository.findAll();  
        return new ResponseEntity<>(countries, HttpStatus.OK);
    }

    @RequestMapping(value="/api/cities",  method={RequestMethod.POST})       
    public ResponseEntity<List<City>> getCities(@RequestBody Country country) throws Exception { 
        List<City> countryCities = new ArrayList<>(); 
        String jsonFile = "city_list.json";
        List<City> cityList = weatherClient.getCities(jsonFile, country.getCode());
        System.out.println("WeatherController - cityList:= " + cityList.size());  
        return new ResponseEntity<>(cityList, HttpStatus.OK);   
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