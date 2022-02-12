
package com.example.demo.dbLoaders;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.demo.model.FamilieAlbum;
import com.example.demo.repository.FamilieAlbumRepository;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.time.Instant;

import org.springframework.boot.json.JsonParser;
import org.springframework.boot.json.JsonParserFactory;

@Component
public class FamilieAlbumLoader implements CommandLineRunner {
    private static final Logger logger = LoggerFactory.getLogger(FamilieAlbumLoader.class);
    @Autowired
    private FamilieAlbumRepository repository;

    @Override
    public void run(String... args) throws Exception {
        logger.info("Application has started");
        if (repository.count() > 0) {
            return;
        }

        StringBuilder sb = new StringBuilder();
        //File file = new File(resource.toURI());
        InputStream inputStream = this.getClass().getResourceAsStream("/familieAlbum.json");
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
        for (Object obj : list) {
            String folder = obj.toString();
            String[] foldersList = folder.split(",");
            for (int i = 0; i < foldersList.length; i++) {
                FamilieAlbum fa = FamilieAlbum.builder()
                        .folder(foldersList[i])
                        .dateCreated(Instant.now())
                        .build();
                repository.save(fa);
            }
        }
     

        /**
         * repository.findAll().forEach((FamilieAlbum) -> {
         * logger.info("{}", FamilieAlbum);
         * });
         **/
    }
}