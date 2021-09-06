package com.example.safarizote.repository;

//import java.time.Instant;
import java.util.Arrays;
//import java.util.Iterator;
import java.util.List;
//import java.util.Set;
//import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

//import com.example.safarizote.model.BackUp;

//import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.Files;

//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
import java.nio.charset.StandardCharsets; 
import org.springframework.util.ResourceUtils;
/*
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;
*/
import java.io.File;

//import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

@Component
public class DirectoryLoader implements CommandLineRunner {
    @Value("classpath:thermopylae.txt")
    private Resource res;
    
    private static final Logger logger = LoggerFactory.getLogger(DirectoryLoader.class);

    @Override
    public void run(String...args) throws Exception {
        logger.info("Application started with command-line arguments: {} . \n To kill this application, press Ctrl + C.", 
        Arrays.toString(args));

        File folder= ResourceUtils.getFile("classpath:folders/");
        System.out.println(folder.getAbsolutePath());

        List<String> lines = Files.readAllLines(Paths.get(res.getURI()),
                StandardCharsets.UTF_8);

        for (String line : lines) {
            System.out.println(line);
        }
    }
}