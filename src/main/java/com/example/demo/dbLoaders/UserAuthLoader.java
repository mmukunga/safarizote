package com.example.demo.dbLoaders;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
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

import com.example.demo.model.UserAuth;
import com.example.demo.repository.UserAuthRepository;

@Component
public class UserAuthLoader implements CommandLineRunner {
  private static final Logger logger = LoggerFactory.getLogger(UserAuthLoader.class);

  @Autowired
  private UserAuthRepository repository;

  @Override
  public void run(String... args) throws Exception {
    logger.info("Application has started");
    repository.deleteAll();

    if (repository.count() > 0) {
      return;
    }

    StringBuilder sb = new StringBuilder();
    InputStream inputStream = this.getClass().getResourceAsStream("/userAuth.json");
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
        String email = (String) map.get("email");
        String token = (String) map.get("token");
        String phone = (String) map.get("phone");

        repository.save(UserAuth.builder()
            .email(email)
            .token(token)
            .phone(phone)
            .dateCreated(Instant.now()).build());
      }
    }
    
    /**
     * repository.findAll().forEach((email) -> {
     * logger.info("{}", email);
     * });
     **/
  }
}