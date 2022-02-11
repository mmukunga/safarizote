package com.example.safarizote.dbLoaders;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import javax.transaction.Transactional;
import com.example.safarizote.model.Rating;
import com.example.safarizote.repository.RatingsRepository;

import java.net.URISyntaxException;
import java.net.URL;
import java.time.Instant;
import java.util.List;
import java.util.Map;
import org.springframework.boot.json.JsonParser;
import org.springframework.boot.json.JsonParserFactory;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;

@Component
@Transactional
public class RatingsLoader implements CommandLineRunner {
        private final RatingsRepository repository;

        public RatingsLoader(RatingsRepository repository) {
                this.repository = repository;
        }

        @Override
        public void run(String... strings) throws URISyntaxException, IOException {
                // logger.info("Application has started");
                if (repository.count() > 0) {
                        return;
                }

                String fileName = "json/ratings.json";
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
                                        String name = (String) map.get("name");
                                        String description = (String) map.get("description");
                                        Integer rating = (Integer) map.get("rating");

                                        repository.save(Rating.builder().name(name)
                                                        .description(description)
                                                        .rating(rating)
                                                        .dateCreated(Instant.now()).build());
                                }
                        }
                }

                // repository.findAll().forEach(System.out::println);
        }
}