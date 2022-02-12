package com.example.demo.dbLoaders;

import java.util.Iterator;
import java.util.List;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.demo.model.BackUp;
import com.example.demo.repository.BackUpRepository;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.net.URL;
import java.util.Map;

import org.springframework.boot.json.JsonParser;
import org.springframework.boot.json.JsonParserFactory;

@Component
public class BackUpLoader implements CommandLineRunner {
    private static final Logger logger = LoggerFactory.getLogger(BackUpLoader.class);
    @Autowired
    private BackUpRepository repository;

    @Override
    public void run(String... args) throws Exception {
        logger.info("Application has started");
        if (repository.count() > 0) {
            return;
        }

        String fileName = "json" + File.separator + "backUps.json";
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
                    System.out.println("..Source: " + "   " + map.get("source"));
                    @SuppressWarnings("unchecked")
                    List<Object> targets = (List<Object>) map.get("targets");
                    System.out.println("..Targets: " + "   " + targets);
                }
            }

        }

        repository.findAll().forEach((backUp) -> {
            displayBackUp(backUp);
        });
    }

    public void displayBackUp(BackUp parent) {
        if (parent.getChildren() == null || parent.getChildren().size() == 0) {
            logger.info("{}", parent);
            return;
        }

        Set<BackUp> children = parent.getChildren();
        Iterator<BackUp> itr = children.iterator();

        while (itr.hasNext()) {
            BackUp backUp = itr.next();
            if (backUp.getChildren().size() != 0) {
                displayBackUp(backUp);
            } else {
                logger.info("{}", backUp);
            }
        }
    }
}