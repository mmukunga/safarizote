package com.example.safarizote.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Calendar;
import java.util.List;

import com.example.safarizote.model.Ticker;
import com.example.safarizote.repository.StockRepository;
import com.example.safarizote.utils.StockClient;

@RestController
public class StockController {
    @Autowired
    private StockClient stockClient;
    @Autowired
    private StockRepository repository;

    @RequestMapping(value="/api/tickers", method = RequestMethod.GET)
    public ResponseEntity<List<Ticker>> getTickers() throws Exception {
        List<Ticker> tickers = repository.findAll();
        
        if (tickers.isEmpty()) {
            throw new Exception();
        }
        
        return new ResponseEntity<>(tickers, HttpStatus.OK);
    }

    @RequestMapping(value="/api/current", method = RequestMethod.POST)
    public ResponseEntity<String> getCurrentStock(@RequestBody Ticker ticker) throws Exception {
        if (repository.findById(ticker.getId()).isEmpty()) {
            throw new Exception();
        }
        String jsonObject = stockClient.yahooCurrent(ticker.getSymbol());
        return new ResponseEntity<>(jsonObject, HttpStatus.OK);
    }

    @RequestMapping(value="/api/history", method = RequestMethod.POST)
    public ResponseEntity<String> getStockHistory(@RequestBody Ticker ticker) throws Exception {
        if (repository.findById(ticker.getId()).isEmpty()) {
            throw new Exception();
        }

        long to = System.currentTimeMillis() / 1000L;
        java.util.Date toTime = new java.util.Date((long)to*1000);
        Calendar cal = Calendar.getInstance();

        cal.setTime(toTime);
        cal.add(Calendar.DATE, -24);
        
        long from = cal.getTime().getTime() / 1000L;
        String jsonObject = stockClient.yahooHistory(ticker.getSymbol(), from, to);      
        return new ResponseEntity<>(jsonObject, HttpStatus.OK);
    }
}
