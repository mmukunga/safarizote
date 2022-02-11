package com.example.demo.controller;

import java.util.List;
import java.net.URI;

import com.example.demo.model.City;
import com.example.demo.model.Country;

import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.client.RestTemplate;
import org.springframework.core.ParameterizedTypeReference;

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

    @GetMapping("/api/countries")
    public ResponseEntity<List<Country>> getCountries() throws Exception {

        URI uri = new URI("https://api.countrystatecity.in/v1/countries");
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-CSCAPI-KEY", "R3VrWVYzUWVtbHNjOGFEbGNhM3Rhb1dZcGpnQ3pQQkV3WlBPMmZHbA==");
        HttpEntity<?> requestEntity = new HttpEntity<>(null, headers);
        ResponseEntity<List<Country>> responseEntity = restTemplate.exchange(uri, HttpMethod.GET, requestEntity,
                new ParameterizedTypeReference<List<Country>>() {
                });

        List<Country> countries = responseEntity.getBody();
        return ResponseEntity.ok().body(countries);
    }

    @PostMapping("/api/cities")
    public ResponseEntity<List<City>> getCities(@RequestBody String iso) throws Exception {
        URI uri = new URI("https://api.countrystatecity.in/v1/countries/" + iso + "/cities");
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-CSCAPI-KEY", "R3VrWVYzUWVtbHNjOGFEbGNhM3Rhb1dZcGpnQ3pQQkV3WlBPMmZHbA==");
        HttpEntity<?> requestEntity = new HttpEntity<>(null, headers);
        ResponseEntity<List<City>> responseEntity = restTemplate.exchange(uri, HttpMethod.GET, requestEntity,
                new ParameterizedTypeReference<List<City>>() {
                });

        List<City> cities = responseEntity.getBody();
        return ResponseEntity.ok().body(cities);
    }

    @PostMapping("/api/weather")
    public ResponseEntity<String> getWeatherData(@RequestBody String query) throws IOException {
        HttpURLConnection con = null;
        InputStream is = null;
        //String location = country.getName() + "," + country.getIso2();

        con = (HttpURLConnection) (new URL(BASE_URL + query + "&cnt=7" + "&units=metric" + "&APPID=" + API_KEY))
                .openConnection();
        con.setRequestMethod("GET");
        con.setDoInput(true);
        con.setDoOutput(true);
        con.connect();
        StringBuffer buffer = new StringBuffer();
        is = con.getInputStream();
        BufferedReader br = new BufferedReader(new InputStreamReader(is));
        String line = null;
        while ((line = br.readLine()) != null)
            buffer.append(line + "\r\n");

        is.close();
        con.disconnect();
        return ResponseEntity.ok().body(buffer.toString());

    }

    @PostMapping("/api/forecast")
    public ResponseEntity<String> getWeatherForecast(@RequestBody String query) throws IOException {
        HttpURLConnection con = null;
        InputStream is = null;
        //String location = country.getName() + "," + country.getIso2();

        con = (HttpURLConnection) (new URL(FORECAST_URL + query + "&units=metric" + "&APPID=" + API_KEY))
                .openConnection();
        con.setRequestMethod("GET");
        con.setDoInput(true);
        con.setDoOutput(true);
        con.connect();
        StringBuffer buffer = new StringBuffer();
        is = con.getInputStream();
        BufferedReader br = new BufferedReader(new InputStreamReader(is));
        String line = null;
        while ((line = br.readLine()) != null)
            buffer.append(line + "\r\n");

        is.close();
        con.disconnect();
        return ResponseEntity.ok().body(buffer.toString());
    }

    public byte[] getImage(String code) throws IOException {
        HttpURLConnection con = null;
        InputStream is = null;

        con = (HttpURLConnection) (new URL(IMG_URL + code)).openConnection();
        con.setRequestMethod("GET");
        con.setDoInput(true);
        con.setDoOutput(true);
        con.connect();

        is = con.getInputStream();
        byte[] buffer = new byte[1024];
        ByteArrayOutputStream baos = new ByteArrayOutputStream();

        while (is.read(buffer) != -1)
            baos.write(buffer);

        return baos.toByteArray();
    }
}