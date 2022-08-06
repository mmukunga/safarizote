package com.safari.springboot.safarizote.utils;

import java.util.List;
import com.safari.springboot.safarizote.repository.StockRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;

import com.safari.springboot.safarizote.model.Stock;
import com.fasterxml.jackson.databind.ObjectMapper;


@Component
public class StockLoader implements CommandLineRunner {

      @Autowired
      private StockRepository repository;
      private static final Logger logger = LoggerFactory.getLogger(StockLoader.class);
      private static final ObjectMapper MAPPER = new ObjectMapper();

      @Override
      public void run(String... args) throws Exception {
        logger.info("Application has started");
        if (repository.count() > 0) {
            return;
        }
               
        String str = "[{\"code\":\"KIT.OL\",\"timestamp\":1643642700,\"gmtoffset\":0,\"open\":22.9,\"high\":23.1,\"low\":22.5,\"close\":22.65,\"volume\":190134,\"previousClose\":22.5,\"change\":0.15,\"change_p\":0.6667}]";
        InputStream responseStream = new ByteArrayInputStream(str.getBytes(StandardCharsets.UTF_8));

        BufferedReader reader = new BufferedReader(new InputStreamReader(responseStream));
        StringBuilder out = new StringBuilder();
        String line;
        while ((line = reader.readLine()) != null) {
           out.append(line);
        }
        
        List<Stock> stocks = Arrays.asList(MAPPER.readValue(out.toString(), Stock[].class));
        stocks.forEach(stock -> {
           repository.save(stock);
        });

        String str2 = "{\"code\":\"XXL.OL\",\"timestamp\":1543642711,\"gmtoffset\":0,\"open\":13.5,\"high\":12.1,\"low\":14.2,\"close\":16.05,\"volume\":70134,\"previousClose\":12.5,\"change\":0.10,\"change_p\":0.2122}";
        InputStream responseStream2 = new ByteArrayInputStream(str2.getBytes(StandardCharsets.UTF_8));
        BufferedReader reader2 = new BufferedReader(new InputStreamReader(responseStream2));
        StringBuilder out2 = new StringBuilder();
        String line2;
        while ((line2 = reader2.readLine()) != null) {
           out2.append(line2);
        }

        Stock stock2 = MAPPER.readValue(out2.toString(), Stock.class);
        repository.save(stock2);

      }
}