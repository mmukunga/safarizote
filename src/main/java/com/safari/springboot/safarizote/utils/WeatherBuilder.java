package com.safari.springboot.safarizote.utils;

import com.safari.springboot.safarizote.model.Weather;
import com.safari.springboot.safarizote.repository.WeatherRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class WeatherBuilder implements CommandLineRunner {
    @Autowired
    private WeatherRepository repository;

    @Override
    public void run(String... args) throws Exception { 
        this.repository.save( Weather.builder()
        .apiKey("6ab73f3655f1a0db55237e9f5b00bff9")
        .build());
    }
}