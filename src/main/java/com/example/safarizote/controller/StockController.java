package com.example.safarizote.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import com.example.safarizote.model.Ticker;
import com.example.safarizote.repository.StockRepository;
import com.example.safarizote.utils.StockClient;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;

@RestController
public class StockController {
    @Autowired
    private StockClient stockClient;
    @Autowired
    private StockRepository repository;

    @RequestMapping(value="/api/tickers", method = RequestMethod.GET)
    public ResponseEntity<List<Ticker>> getTickers() throws Exception {
        System.out.println("Current Stock, the time at the server is now " + new Date() + "\n");
        List<Ticker> tickers = repository.findAll();
        
        if (tickers.isEmpty()) {
            throw new Exception();
        }
        
        System.out.println("Current Stock, the time at the server is now " + new Date() + "\n");
        System.out.println("Tickers:" + tickers ) ;
        return new ResponseEntity<>(tickers, HttpStatus.OK);
    }

    @RequestMapping(value="/api/current", method = RequestMethod.POST)
    public ResponseEntity<String> getCurrentStock(@RequestBody Ticker ticker) throws Exception {
        System.out.println("Current Stock, the time at the server is now " + new Date() + "\n");
        System.out.println("Current Stock:" + ticker); 
        // Validate Sticker
        if (repository.findById(ticker.getId()).isEmpty()) {
            throw new Exception();
        }
        String jsonObject = stockClient.yahooCurrent(ticker.getSymbol());
        System.out.println("Current Stock, the time at the server is now " + new Date() + "\n");
        System.out.println("******Current Stock******:" + jsonObject );
        return new ResponseEntity<>(jsonObject, HttpStatus.OK);
    }

    @RequestMapping(value="/api/history", method = RequestMethod.POST)
    public ResponseEntity<String> getStockHistory(@RequestBody Ticker ticker) throws Exception {
        System.out.println("Stock History, the time at the server is now " + new Date() + "\n");
        System.out.println("******Stock History*******:" + ticker); 
        // Validate Sticker
        if (repository.findById(ticker.getId()).isEmpty()) {
            throw new Exception();
        }

        long to = System.currentTimeMillis() / 1000L;
        java.util.Date toTime = new java.util.Date((long)to*1000);
        Calendar cal = Calendar.getInstance();

        //It's a good point better use cal because date-functions are deprecated
        cal.setTime(toTime);
        System.out.println(cal.get(Calendar.DAY_OF_MONTH));
        cal.add(Calendar.DATE, -24);
        //Integer historyDAYS = 10;
        
        long from = cal.getTime().getTime() / 1000L;
        java.util.Date fromTime = new java.util.Date((long)from*1000);
        System.out.println("**TO:= " + toTime);
        System.out.println("**FROM:= " + fromTime);

        String jsonObject = stockClient.yahooHistory(ticker.getSymbol(), from, to);

        System.out.println("Stock History, the time at the server is now " + new Date() + "\n");
        System.out.println("Stock History:" + jsonObject ) ;
        

        //JsonObject jsonChart = (JsonObject) jsonObject.get("chart");
        //JsonArray results = (JsonArray) jsonChart.get("result");

        //if (results == null || results.size() != 1) {
         //   System.out.println("NO CHART!!");
      //  }

        return new ResponseEntity<>(jsonObject, HttpStatus.OK);
    }
}
