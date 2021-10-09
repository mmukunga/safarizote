package com.example.safarizote.repository;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets; 
import java.io.InputStream;

import org.springframework.core.io.Resource;
import org.springframework.core.io.ClassPathResource;

import java.io.BufferedReader;
import java.io.InputStreamReader;

import com.google.gson.Gson;
import com.example.safarizote.model.Folder;

@Component
public class DirectoryLoader implements CommandLineRunner {
    @Value("classpath:example.txt")
    private Resource res;

    @Override
    public void run(String...args) throws Exception {
        Resource resource = new ClassPathResource("example.txt");
        InputStream inputStream = resource.getInputStream();
        InputStreamReader isr = new InputStreamReader(inputStream,
                StandardCharsets.UTF_8);   
                 
        BufferedReader br = new BufferedReader(isr);  
        br.lines().forEach(line -> System.out.println(line)); 
        
        String line = null;
        while ((line = br.readLine()) != null) {
            String jsonString = line;
            Gson gson = new Gson(); 
            gson.fromJson(jsonString, Folder.class); 
        }
        br.close();
    }
}