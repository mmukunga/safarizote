package com.example.safarizote.dbLoaders;

import java.util.List;
import com.example.safarizote.repository.StockRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;

import com.example.safarizote.model.Stock;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.api.client.util.Charsets;
import com.google.common.io.CharStreams;

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

            String json = CharStreams.toString(new InputStreamReader(responseStream, Charsets.UTF_8));

            List<Stock> stocks = Arrays.asList(MAPPER.readValue(json, Stock[].class));

            stocks.forEach(stock -> {
                  repository.save(stock);
            });

            String str2 = "{\"code\":\"XXL.OL\",\"timestamp\":1543642711,\"gmtoffset\":0,\"open\":13.5,\"high\":12.1,\"low\":14.2,\"close\":16.05,\"volume\":70134,\"previousClose\":12.5,\"change\":0.10,\"change_p\":0.2122}";
            InputStream responseStream2 = new ByteArrayInputStream(str2.getBytes(StandardCharsets.UTF_8));

            String json2 = CharStreams.toString(new InputStreamReader(responseStream2, Charsets.UTF_8));

            Stock stock2 = MAPPER.readValue(json2, Stock.class);
            repository.save(stock2);

      }
}