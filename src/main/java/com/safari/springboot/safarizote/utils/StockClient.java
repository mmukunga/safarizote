package com.safari.springboot.safarizote.utils;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.time.Instant;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import com.safari.springboot.safarizote.model.Stock;
import com.safari.springboot.safarizote.model.StockStore;
import com.safari.springboot.safarizote.repository.StockStoreRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.api.client.util.Charsets;
import com.google.common.io.CharStreams;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class StockClient {
    private static final ObjectMapper MAPPER = new ObjectMapper();
    @Autowired
    private StockStoreRepository repository;

    public List<Stock> getStockDetails(String symbol) throws Exception {
        StringBuilder out = new StringBuilder();
        InputStream responseStream = null;
        String token = "61f830139147a5.28651595";
        Optional<StockStore> stockStore = repository.findBySymbol(symbol);  

        if (!stockStore.isPresent()) {
            String fmt = "json";
            String additionals = "KIT.OL,TIETO.OL,SAS.CO,NEL.OL,XXL.OL";
            
            String stockUrlQuery = URLEncoder.encode(symbol.toUpperCase(), StandardCharsets.UTF_8);
            URL url = new URL("https://eodhistoricaldata.com/api/real-time/" + stockUrlQuery + "?api_token=" + token
            + "&fmt=" + fmt + "&s=" + additionals);
            try {
            HttpURLConnection connection = (HttpURLConnection) url.openConnection(); 
            connection.setRequestProperty("accept", "application/json");
            responseStream = connection.getInputStream();  
            } catch (IOException e) { 
                Optional<StockStore> stock = repository.findBySymbol("KIT"); 
                responseStream =  new ByteArrayInputStream(stock.get().getJsonFile().getBytes(StandardCharsets.UTF_8));    
            }
            String json = CharStreams.toString(new InputStreamReader(
                responseStream, Charsets.UTF_8));

            Instant instant = Instant.now();    
            StockStore stock = StockStore.builder().symbol(symbol).jsonFile(json).dateCreated(instant).build();
            stock = repository.save(stock);    
        } else {                  
            Instant startTime = stockStore.get().getDateCreated();
            Instant currentTime  = Instant.now();     
            Duration timeElapsed = Duration.between(startTime, currentTime);
            int tenSeconds = 10*60;
            if (timeElapsed.getSeconds() > tenSeconds) {
                System.out.println("Execution time is UP. GET NEW DATA");
            }
            String str = stockStore.get().getJsonFile(); 
            responseStream =  new ByteArrayInputStream(str.getBytes(StandardCharsets.UTF_8));
        } 
        BufferedReader reader = new BufferedReader(new InputStreamReader(responseStream));
        String line;
        while ((line = reader.readLine()) != null) {
            out.append(line);
        }      
        Optional<StockStore> stock = repository.findBySymbol(symbol); 
        List<Stock> stocks = Arrays.asList(MAPPER.readValue(stock.get().getJsonFile(), Stock[].class));
        System.out.println("getStockDetails END OK!!"); 
        return stocks;
    }
}
