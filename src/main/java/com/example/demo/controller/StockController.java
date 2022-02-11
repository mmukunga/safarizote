package com.example.demo.controller;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import com.example.demo.model.Stock;
import com.example.demo.repository.StockRepository;
import com.example.demo.utils.StockClient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StockController {

   @Autowired
   private StockRepository repository;
   private final Set<String> repeatCallers = Collections.synchronizedSet(new HashSet<>());

   @GetMapping(path="/api/stockMarket", produces = "text/plain")
   public ResponseEntity<List<Stock>> stockMarket(@RequestParam("From") String fromNumber,
                         @RequestParam("Body") String symbol) {

        Set<String> stockList = new HashSet<>(); 
        stockList.add("OSLO");  
        stockList.add("HELSINKI");  
        stockList.add("NEW YORK"); 
        
        repeatCallers.addAll(stockList);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json; charset=utf-8");

        if (!repeatCallers.contains(fromNumber)) {
            repeatCallers.add(fromNumber);
            return new ResponseEntity<>(new ArrayList<>(), headers, HttpStatus.OK);
        }
        
        try {

           Long maxId = repository.getMaxId();   
           Stock lastStock = repository.getOne(maxId);

           String timestamp  = lastStock.getTimestamp();
           long fiveMinutes = 15 * 60 * 1000;
           long elapsedTime = (System.currentTimeMillis()/1000) - Long.parseLong(timestamp);
            if (elapsedTime > fiveMinutes) { 
                List<Stock> stocks = StockClient.getStockDetails(symbol);                       
                stocks.forEach(stock -> {
                    repository.save(stock);
                });
                if (stocks.isEmpty()) {
                    return new ResponseEntity<>(new ArrayList<>(), headers, HttpStatus.OK);
                }   
                return new ResponseEntity<>(stocks, headers, HttpStatus.OK);
            } else {  
                List<Stock> stocksList = repository.findAll();  
                return new ResponseEntity<>(stocksList, headers, HttpStatus.OK);
            } 
           
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.notFound().build();
        }
        
    }
}