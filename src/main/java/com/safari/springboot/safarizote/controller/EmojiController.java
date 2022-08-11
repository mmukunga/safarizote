package com.safari.springboot.safarizote.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.safari.springboot.safarizote.model.Emoji;
import com.safari.springboot.safarizote.repository.EmojiRepository;

@RestController
public class EmojiController {
    @Autowired
    EmojiRepository repository;

    @RequestMapping("/api/emojis")
    public ResponseEntity<List<Emoji>> findAll() {
      List<Emoji> list = repository.findAll();
      HttpHeaders headers = new HttpHeaders();
      return new ResponseEntity<>(list, headers, HttpStatus.OK);
    }

    @RequestMapping(value="/api/findEmoji", method=RequestMethod.GET)
    public ResponseEntity<Emoji> findEmoji(@RequestParam(name="name") String name) {
      System.out.println("Name: " +  name);
      List<Emoji> emoji = repository.findByName(name);
      HttpHeaders headers = new HttpHeaders(); 
      return new ResponseEntity<>(emoji.get(0), headers, HttpStatus.OK);
    }
 
    @RequestMapping(value="/api/appEmojis", method=RequestMethod.GET)
    public ResponseEntity<List<Emoji> > appEmojis() { 
      List<Emoji> list = repository.findAll();
      HttpHeaders headers = new HttpHeaders();
      return new ResponseEntity<>(list, headers, HttpStatus.OK);
    }
 
    @RequestMapping(value="/api/saveEmojis", method=RequestMethod.POST, consumes=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity< List<Emoji>> saveEmojis(@RequestBody Emoji[] emojis) {  
      List<Emoji> list = Arrays.asList(emojis);

      List<Emoji> appEmojis = repository.findAll();
      for (int i = 0; i < list.size(); i++) {
        for (int j = 0; j < appEmojis.size(); j++) {
          if (appEmojis.get(j).getLabel().equals(list.get(i).getName())){
            appEmojis.get(j).setSvgUrl(list.get(i).getSvgUrl());
          }
        }      
      }

      List<Emoji> dbemojis = repository.saveAll(appEmojis);
      HttpHeaders headers = new HttpHeaders();
      return new ResponseEntity<>(dbemojis, headers, HttpStatus.OK);
    }
}