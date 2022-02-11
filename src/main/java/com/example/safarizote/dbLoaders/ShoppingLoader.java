package com.example.safarizote.dbLoaders;

import java.time.Instant;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.safarizote.model.Shopping;
import com.example.safarizote.repository.ShoppingRepository;

import java.net.URL;
import java.util.List;
import java.util.Map;

import org.springframework.boot.json.JsonParser;
import org.springframework.boot.json.JsonParserFactory;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;

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

      String fileName = "json/shoppings.json";
      ClassLoader classLoader = getClass().getClassLoader();
      URL resource = classLoader.getResource(fileName);
      if (resource == null) {
         throw new IllegalArgumentException("file not found! " + fileName);
      } else {
         StringBuilder sb = new StringBuilder();
         File file = new File(resource.toURI());
         FileReader fileReader = new FileReader(file);
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
      }
      /*
       * repository.findAll().forEach((shopping) -> {
       * logger.info("{}", shopping);
       * });
       */
   }
}