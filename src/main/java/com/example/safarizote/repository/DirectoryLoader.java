package com.example.safarizote.repository;

import java.util.Arrays;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets; 

import java.util.Date;
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
    
    private static final Logger logger = LoggerFactory.getLogger(DirectoryLoader.class);

    @Override
    public void run(String...args) throws Exception {
        logger.info("Application started with command-line arguments: {} . \n To kill this application, press Ctrl + C.", 
        Arrays.toString(args));
        System.out.println("1.After Format : " + new Date());
        Resource resource = new ClassPathResource("example.txt");
        InputStream inputStream = resource.getInputStream();
        System.out.println("2.After Format : " + new Date());
        InputStreamReader isr = new InputStreamReader(inputStream,
                StandardCharsets.UTF_8);   
                 
        BufferedReader br = new BufferedReader(isr);   
        System.out.println("3.After Format : " + new Date());
        br.lines().forEach(line -> System.out.println(line));      
        System.out.println("4.After Format : " + new Date()); 
        
        String line = null;
        while ((line = br.readLine()) != null) {
            String jsonString = line;
            Gson gson = new Gson(); 
            Folder folder = gson.fromJson(jsonString, Folder.class); 
            System.out.println(folder);
/*
            String[] values = line.split(",");
            for (String str : values) {
                System.out.println(str);
            }
*/
        }
        br.close();
    }
}