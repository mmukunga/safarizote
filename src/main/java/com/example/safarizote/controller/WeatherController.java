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
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;


@RestController
public class WeatherController {
    private static final String API_KEY = "6ab73f3655f1a0db55237e9f5b00bff9";
    private static String BASE_URL = "http://api.openweathermap.org/data/2.5/weather?q=";
    private static String FORECAST_URL = "http://api.openweathermap.org/data/2.5/forecast/daily?q=";
    private static String IMG_URL = "http://openweathermap.org/img/w/";

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
        System.out.println("1.Current Weather - COUNTRY1:= " + country); 
        HttpURLConnection con = null ;
        InputStream is = null;
        String location = "Kabul, AF";
        try {
            con = (HttpURLConnection) ( new URL(BASE_URL + location + "&cnt=7" + "&units=metric" + "&APPID="+API_KEY)).openConnection();
            con.setRequestMethod("GET");
            con.setDoInput(true);
            con.setDoOutput(true);
            con.connect();
            System.out.println("2.Current Weather - COUNTRY2:= " + country); 
            // Let's read the response
            StringBuffer buffer = new StringBuffer();
            is = con.getInputStream();
            BufferedReader br = new BufferedReader(new InputStreamReader(is));
            String line = null;
            while (  (line = br.readLine()) != null )
                buffer.append(line + "\r\n");

            System.out.println("3.Current Weather - COUNTRY3:= " + country); 
            is.close();
            con.disconnect();
            System.out.println("4.Current Weather - COUNTRY4:= " + country); 
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

    @RequestMapping(value = "/api/forecast",  method={RequestMethod.POST})
    public ResponseEntity<String> getWeatherForecast(@RequestBody Country country) throws IOException {
        System.out.println("1.Forecast Weather - COUNTRY1:= " + country); 
        HttpURLConnection con = null ;
        InputStream is = null;
        String location = "Kabul, AF";
        try {
            con = (HttpURLConnection) ( new URL(FORECAST_URL + location + "&units=metric" + "&APPID="+API_KEY)).openConnection();
            con.setRequestMethod("GET");
            con.setDoInput(true);
            con.setDoOutput(true);
            con.connect();
            System.out.println("2.Forecast Weather - COUNTRY2:= " + country); 
            // Let's read the response
            StringBuffer buffer = new StringBuffer();
            is = con.getInputStream();
            BufferedReader br = new BufferedReader(new InputStreamReader(is));
            String line = null;
            while (  (line = br.readLine()) != null )
                buffer.append(line + "\r\n");

            System.out.println("3.Forecast Weather - COUNTRY3:= " + country); 
            is.close();
            con.disconnect();
            System.out.println("4.Forecast Weather - COUNTRY4:= " + country); 
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

    public byte[] getImage(String code) {
        HttpURLConnection con = null ;
        InputStream is = null;
        try {
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
        catch(Throwable t) {
            t.printStackTrace();
        }
        finally {
            try { is.close(); } catch(Throwable t) {}
            try { con.disconnect(); } catch(Throwable t) {}
        }
 
        return null;
 
    }
}    