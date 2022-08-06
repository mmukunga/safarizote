package com.safari.springboot.safarizote.controller;

import java.time.Instant;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParseException;
import com.safari.springboot.safarizote.model.AppLogger;
import com.safari.springboot.safarizote.repository.AppLogRepository;

import java.lang.reflect.Type;

@RestController
public class ErrorLogController {
  @Autowired
  private AppLogRepository repository;

  @RequestMapping(value = "/api/viewErrors", method = RequestMethod.GET)
  public ResponseEntity<List<AppLogger>> viewErrors() throws Exception {
    List<AppLogger> list = repository.findAll();
    return new ResponseEntity<>(list, HttpStatus.OK);
  }

  @RequestMapping(value = "/api/saveError", method = RequestMethod.POST)
  public ResponseEntity<AppLogger> saveError(@RequestBody String log) throws Exception {
    System.out.println(log);

    JsonObject jsonObj = (JsonObject) new Gson().fromJson(log, JsonObject.class);
    Gson gson = new GsonBuilder().registerTypeAdapter(Instant.class, new JsonDeserializer<Instant>() {
      @Override
      public Instant deserialize(JsonElement json, Type typeOfT, JsonDeserializationContext context)
          throws JsonParseException {
        return Instant.parse(json.getAsString());
      }
    }).create();

    AppLogger logItem = gson.fromJson(jsonObj, AppLogger.class);
    AppLogger dbLog = repository.save(logItem);

    return new ResponseEntity<>(dbLog, HttpStatus.OK);
  }

  @RequestMapping(value = "/api/deleteAll", method = RequestMethod.POST)
  public ResponseEntity<List<AppLogger>> deleteAll() throws Exception {
    repository.deleteAll();
    List<AppLogger> list = repository.findAll();
    System.out.println("Logs Deleted OK!");
    return new ResponseEntity<>(list, HttpStatus.OK);
  }
}
