package com.example.demo.dbLoaders;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.json.JsonParser;
import org.springframework.boot.json.JsonParserFactory;
import org.springframework.stereotype.Component;

import com.example.demo.model.Safari;
import com.example.demo.repository.SafariRepository;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;

@Component
public class SafariLoader implements CommandLineRunner {
        private static final Logger logger = LoggerFactory.getLogger(SafariLoader.class);

        @Autowired
        private SafariRepository repository;

        @Override
        public void run(String... args) throws Exception {
                logger.info("Application has started");
                // repository.deleteAll();
                if (repository.count() > 0) {
                        return;
                }

                StringBuilder sb = new StringBuilder();
                InputStream inputStream = this.getClass().getResourceAsStream("/safaris.json");
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
                        String title = (String) map.get("title");
                        String strPrice = map.get("price").toString();
                        BigDecimal bigDecimal = new BigDecimal(strPrice);
                        String summary = (String) map.get("summary");
                        String description = (String) map.get("description");
                        String image = (String) map.get("image");

                        repository.save(Safari.builder().title(title)
                                  .price(bigDecimal)
                                  .summary(summary)
                                  .description(description)
                                  .image(image)
                                  .dateCreated(Instant.now()).build());
                    }
                }
                
                /*
                 * repository.findAll().forEach((Safari) -> {
                 * logger.info("{}", Safari);
                 * });
                 */
        }

}