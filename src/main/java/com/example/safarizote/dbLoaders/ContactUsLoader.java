package com.example.safarizote.dbLoaders;

import java.time.Instant;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.net.URL;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.safarizote.model.ContactUs;
import com.example.safarizote.repository.ContactUsRepository;
import org.springframework.boot.json.JsonParser;
import org.springframework.boot.json.JsonParserFactory;

@Component
public class ContactUsLoader implements CommandLineRunner {
  private static final Logger logger = LoggerFactory.getLogger(ContactUsLoader.class);

  @Autowired
  private ContactUsRepository repository;

  @Override
  public void run(String... args) throws Exception {
    logger.info("Application has started");
    if (repository.count() > 0) {
      return;
    }

    String fileName = "json/emails.json";
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

          String username = (String) map.get("username");
          String email = (String) map.get("email");
          String phone = (String) map.get("phone");
          String gender = (String) map.get("gender");
          String message = (String) map.get("message");

          repository.save(ContactUs.builder().username(username)
              .email(email)
              .phone(phone)
              .gender(gender)
              .message(message)
              .date(Instant.now()).build());
        }
      }
    }
    /**
     * repository.findAll().forEach((email) -> {
     * logger.info("{}", email);
     * });
     **/
  }
}