package com.safari.springboot.safarizote.utils;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.time.Instant;
import java.util.List;

import com.safari.springboot.safarizote.model.StockStore;
import com.safari.springboot.safarizote.repository.StockStoreRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class StockStoreBuilder implements CommandLineRunner {
    @Autowired
    private StockStoreRepository repository;

    @Override
    public void run(String... args) throws Exception {   
        InputStream ioStream = this.getClass().getClassLoader().getResourceAsStream("stockStore.json");
        if (ioStream == null) {
            throw new IllegalArgumentException("stockStore.json" + " is not found");
        }
        
        StringBuilder out = new StringBuilder();
        InputStreamReader isr = new InputStreamReader(ioStream); 
        BufferedReader br = new BufferedReader(isr);
        String line;

        while ((line = br.readLine()) != null) {
            System.out.println(line);
            out.append(line);
        }
        ioStream.close();

        String json = out.toString(); 
        repository.save( StockStore.builder()
            .symbol("KIT")
            .jsonFile(json)
            .dateCreated(Instant.now())
            .build());

        List<StockStore> crunchifyList = repository.findAll();
        crunchifyList.forEach((temp) -> {
            System.out.println(temp);
        });
    }
}