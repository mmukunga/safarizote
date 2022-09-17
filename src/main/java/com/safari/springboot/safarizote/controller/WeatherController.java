package com.safari.springboot.safarizote.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Map;

import com.safari.springboot.safarizote.model.Weather;
import com.safari.springboot.safarizote.repository.WeatherRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WeatherController {
    @Autowired
    private WeatherRepository repository;

    @RequestMapping(value="/api/health", method=RequestMethod.GET)
    public ResponseEntity<String> healthCheck() throws IOException {
        return new ResponseEntity<>("healthCheck", HttpStatus.OK);
    }

    @RequestMapping(value="/api/current", method=RequestMethod.POST)
    public ResponseEntity<String> getCurrent(@RequestBody Map<String, Object> map) throws IOException {
        System.out.println(map);
        String query=map.get("city") +  "," + map.get("country");
        System.out.println(query);
        Weather weather = repository.findAll().get(0);
        String key =  weather.getApiKey();
        String APIUrl = "http://api.openweathermap.org/data/2.5/weather?q="+ query + "&appid=" + key;
        StringBuilder stringBuilder = getJsonFile(APIUrl );
        return new ResponseEntity<>(stringBuilder.toString(), HttpStatus.OK);
    }

    @RequestMapping(value="/api/forecast", method=RequestMethod.POST)
    public ResponseEntity<String> getForecast(@RequestBody Map<String, String> map) throws IOException {
        System.out.println(map);
        String query=map.get("city") +  "," + map.get("country");
        System.out.println(query);
        Weather weather = repository.findAll().get(0);
        String key =  weather.getApiKey();
        String APIUrl = "http://api.openweathermap.org/data/2.5/forecast/daily?q="+query+"&type=accurate&cnt=6&appid="+key;
        StringBuilder stringBuilder = getJsonFile(APIUrl);
        return new ResponseEntity<>(stringBuilder.toString(), HttpStatus.OK);
    }

    public StringBuilder getJsonFile(String fileUrl ) throws IOException {
        StringBuilder stringBuilder = new StringBuilder();
        URL url = new URL(fileUrl);
        
        HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
        urlConnection.setRequestMethod("GET");
        urlConnection.setRequestProperty("Content-type", "application/json;charset=utf-8");
        BufferedReader bufferedReader;
        Integer responseStatus = urlConnection.getResponseCode(); 

        if (responseStatus >= 200 && responseStatus <= 300) {
            bufferedReader = new BufferedReader(new InputStreamReader(urlConnection.getInputStream()));
        } else {
            bufferedReader = new BufferedReader(new InputStreamReader(urlConnection.getErrorStream()));
        }

        String line = "";
        while ((line = bufferedReader.readLine()) != null) {
            stringBuilder.append(line);
        }

        bufferedReader.close();
        urlConnection.disconnect();

        return stringBuilder;
    }
}