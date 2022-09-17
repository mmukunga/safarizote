package com.safari.springboot.safarizote.controller;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.concurrent.atomic.LongAdder;
import com.safari.springboot.safarizote.model.Stock;
import com.safari.springboot.safarizote.model.Token;
import com.safari.springboot.safarizote.repository.StockRepository;
import com.safari.springboot.safarizote.utils.StockClient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StockController {

   @Autowired
   private StockClient stockClient; 
   @Autowired
   private StockRepository repository;
   private final Set<String> repeatCallers = Collections.synchronizedSet(new HashSet<>());
   private LongAdder longId = new LongAdder();
   @RequestMapping(value="/api/getOptions", method=RequestMethod.GET, produces = "application/json" )
   public ResponseEntity<List<Token>> getOptions() { 

        List<Token> options = new ArrayList<>();
        options.add(Token.builder().id(longId.longValue()).label("Norwegian Air Shuttle").value("NAS.OL").icon("📈").build()); 
        options.add(Token.builder().id(getId()).label("Apple MAC USA").value("AAPL.US").icon("💲").build()); 
        options.add(Token.builder().id(getId()).label("Telenor ASA Oslo").value("TEL.OL").icon("💵").build());
        options.add(Token.builder().id(getId()).label("Scandinavian Airline Services").value("SAS").icon("💱").build()); 
        options.add(Token.builder().id(getId()).label("XXL").value("XXL").icon("📉").build()); 
        options.add(Token.builder().id(getId()).label("Kitron").value("KIT").icon("💰").build()); 
        options.add(Token.builder().id(getId()).label("Nel").value("NEL").icon("💹").build()); 

        JSONArray jsonArray = new JSONArray();
        for (int i = 0; i < options.size(); i++) {
            Token option = options.get(i);
            String str = "{label:" + option.getLabel() + ",value:" +option.getValue() + ",icon:" +option.getIcon()+"}";
            JSONObject obj = new JSONObject(str);
            jsonArray.put(obj);
        }

        System.out.println(jsonArray);
        return new ResponseEntity<>(options, HttpStatus.OK); 
   }

   public Long getId() {
    longId.increment();
    return longId.longValue();
   }

   @RequestMapping(value="/api/stockMarket", method=RequestMethod.POST)
   public ResponseEntity<List<Stock>> stockMarket(@RequestBody Token token, 
                        @RequestParam(name="fromNumber",required=true) String fromNumber) throws Exception {
        Set<String> stockList = new HashSet<>(); 
        stockList.add("OSLO");  
        stockList.add("HELSINKI");  
        stockList.add("NEW YORK"); 
        repeatCallers.addAll(stockList);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/json;charset=utf-8");
        if (!repeatCallers.contains(fromNumber)) {
            repeatCallers.add(fromNumber);
            System.out.println("Welcome to stonksbot \uD83D\uDCC8. Text me a valid ticker symbol and I'll give you quote data.");
        }

        System.out.println("stockMarket..5 repeatCallers= " + repeatCallers);

        Long maxId = repository.getMaxId();   
        Stock lastStock = repository.getById(maxId);
        String timestamp  = lastStock.getTimestamp();
        long fiveMinutes = 15 * 60 * 1000;
        long elapsedTime = (System.currentTimeMillis()/1000) - Long.parseLong(timestamp);
        if (elapsedTime > fiveMinutes) { 
            List<Stock> stocks = stockClient.getStockDetails(token.getValue());
            stocks.forEach(stock -> {
                repository.save(stock);
            });
            if (stocks.isEmpty()) {
                return new ResponseEntity<>(new ArrayList<>(), headers, HttpStatus.OK);
            }
            return new ResponseEntity<>(stocks, headers, HttpStatus.OK);
        }       
        List<Stock> stocksList = repository.findAll(); 
        return new ResponseEntity<>(stocksList, headers, HttpStatus.OK);          
    }
}