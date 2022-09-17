package com.safari.springboot.safarizote.controller;

import java.time.Instant;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import org.json.JSONObject;

import com.safari.springboot.safarizote.model.Log;
import com.safari.springboot.safarizote.repository.AppLogRepository;

@RestController
public class LogController {
  @Autowired
  private AppLogRepository repository;

  @RequestMapping(value = "/api/fetchLogs", method = RequestMethod.GET)
  public ResponseEntity<List<Log>> fetchLogs() throws Exception {
    System.out.println("fetchLogs Start.. " + new Date());
    List<Log> logs = repository.findAll();
    System.out.println("fetchLogs End OK!");
    return new ResponseEntity<>(logs, HttpStatus.OK);
  }

  @RequestMapping(value = "/api/saveLog", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<Log> saveLog(@RequestBody String body) throws Exception {
    System.out.println("saveLog Start.. " + new Date());
    System.out.println(body);
    String path = "";
    JSONObject error = null;
    Instant timestamp = Instant.now();

    if (body.contains("Firebase")) {
      JSONObject jsonObj = new JSONObject(body);
      String bodyObj = jsonObj.getString("body");
      JSONObject obj = new JSONObject(bodyObj);
      path = obj.getString("path");
      error = obj.getJSONObject("error");
    }

    Log temp = Log.builder()
        .path(path)
        .error(error != null ? error.toString() : null)
        .timestamp(timestamp).build();

    Log dbLog = repository.save(temp);
    System.out.println(dbLog);
    System.out.println("saveLog End OK!!");
    return new ResponseEntity<>(dbLog, HttpStatus.OK);
  }

  @RequestMapping(value = "/api/deleteAll", method = RequestMethod.POST)
  public ResponseEntity<List<Log>> deleteAll() throws Exception {
    System.out.println("Logs.deleteAll Start.. OK!");
    repository.deleteAll();
    List<Log> list = repository.findAll();
    System.out.println("Logs.deleteAll End OK!!");
    return new ResponseEntity<>(list, HttpStatus.OK);
  }
}
