package com.example.safarizote.repository;

import java.time.Instant;
import java.util.Calendar;
import java.util.Date;

import com.example.safarizote.model.Ticker;
import com.example.safarizote.utils.StockClient;
import com.google.gson.JsonObject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class StockLoader implements CommandLineRunner {

    @Autowired 
    private StockClient stockClient;

    @Autowired
    private StockRepository repository;
    private static final Logger logger = LoggerFactory.getLogger(StockLoader.class); 

   @Override
    public void run(String... args) throws Exception {
        logger.info("Application has started");
        
        repository.deleteAll();

        if (repository.findAll().isEmpty()) {    
            repository.save(Ticker.builder().name("NAS").symbol("NAS.OL").costPrice(913.0625).shares(4).description("NORWEGIAN AIR SHUT").selected(false).dateCreated(Instant.now()).build());
            repository.save(Ticker.builder().name("KIT").symbol("KIT.OL").costPrice(0.0).shares(0).description("Kitron ASA").selected(false).dateCreated(Instant.now()).build());
            repository.save(Ticker.builder().name("NEL").symbol("NEL.OL").costPrice(22.95).shares(100).description("Nel ASA").selected(false).dateCreated(Instant.now()).build());
            repository.save(Ticker.builder().name("XXL").symbol("XXL.OL").costPrice(23.95).shares(100).description("XXL ASA").selected(false).dateCreated(Instant.now()).build());
            repository.save(Ticker.builder().name("TEL").symbol("TEL.OL").costPrice(0.0).shares(0).description("Telenor ASA").selected(false).dateCreated(Instant.now()).build());
            repository.save(Ticker.builder().name("SAS AB").symbol("SAS-NOKO.OL").costPrice(1.95).shares(500).description("Scandinavian Air Service").selected(false).dateCreated(Instant.now()).build());
            repository.save(Ticker.builder().name("TIETO").symbol("TIETO.HE").costPrice(0.0).shares(0).description("TietoEVRY Oyj Helsinki").selected(false).dateCreated(Instant.now()).build());
        }

        String ticker = "XXL.OL";
        
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.DATE, -1); 
        Date yesterday = cal.getTime();
        long period1 = yesterday.getTime() / 1000L;

        Date now = new Date();
        long period2 = now.getTime() / 1000L;

        String jsonObjectHist = stockClient.yahooHistory(ticker, period1, period2);
        System.out.println("jsonObjectHist:= " + jsonObjectHist);
        String jsonObject = stockClient.yahooCurrent(ticker); 
        System.out.println("jsonObject:= " + jsonObject);          
    }
}