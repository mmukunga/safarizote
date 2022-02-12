package com.example.demo.dbLoaders;

import java.time.Instant;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.demo.model.Shopping;
import com.example.demo.repository.ShoppingRepository;

import java.util.List;
import java.util.Map;

import org.springframework.boot.json.JsonParser;
import org.springframework.boot.json.JsonParserFactory;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;

@Component
public class ShoppingLoader implements CommandLineRunner {
   private static final Logger logger = LoggerFactory.getLogger(ShoppingLoader.class);

   @Autowired
   private ShoppingRepository repository;

   @Override
   public void run(String... args) throws Exception {
      logger.info("Application has started");
      if (repository.count() > 0) {
         return;
      }

      StringBuilder sb = new StringBuilder();
      InputStream inputStream = this.getClass().getResourceAsStream("/shoppings.json");
      InputStreamReader inputStreamReader = new InputStreamReader(inputStream);
      BufferedReader fileReader = new BufferedReader(inputStreamReader);
      BufferedReader in = new BufferedReader(fileReader);
      String line = in.readLine();
      while (line != null) {
         sb.append(line);
         sb.append(System.lineSeparator());
         line = in.readLine();
      }
      fileReader.close();

      JsonParser springParser = JsonParserFactory.getJsonParser();
      List<Object> list = springParser.parseList(sb.toString());
      for (Object o : list) {
         if (o instanceof Map) {
            @SuppressWarnings("unchecked")
            Map<String, Object> map = (Map<String, Object>) o;
            String shop = (String) map.get("shop");
            String price = map.get("price").toString();
            String product = (String) map.get("product");

            repository.save(Shopping.builder()
                  .shop(shop)
                  .price(Double.valueOf(price))
                  .product(product)
                  .dateCreated(Instant.now()).build());
         }
      }
      /*
       * repository.findAll().forEach((shopping) -> {
       * logger.info("{}", shopping);
       * });
       */
   }
}