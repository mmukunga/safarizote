package com.example.safarizote.controller;

import java.util.List;
import java.time.Instant;
import java.net.URL;
import java.net.UnknownHostException;
import java.net.InetAddress;
import java.io.IOException;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;

import com.example.safarizote.model.Metrics;
import com.example.safarizote.repository.MetricsRepository;

@RestController
public class MetricsController { 
  @Autowired
  private MetricsRepository repository;
    
  @RequestMapping(value="/api/healthCheck", method=RequestMethod.POST)
  public ResponseEntity<String> healthCheck() {
      String status = "healthCheck: OK!!";
      return new ResponseEntity<>(status, HttpStatus.OK);
  }

  @RequestMapping(value = "/api/allHits",  method={RequestMethod.GET})
  public ResponseEntity<List<Metrics>> findAll() {
    List<Metrics> visits = repository.findAll();
    for (Metrics temp : visits) {
        System.out.println(temp);
    }
    System.out.println("Metrics.findAll(),  End OK!");
    return new ResponseEntity<>(visits, HttpStatus.OK);
  }

  @RequestMapping(value = "/api/saveVisit",  method={RequestMethod.POST})
  public ResponseEntity<List<Metrics>> save(@RequestBody Metrics visit) throws IOException {
    System.out.println("Metrics.save(),  Start..");
    
    Document doc = Jsoup.connect("http://www.checkip.org").get();
    String myip = doc.getElementById("yourip").select("h1").first().select("span").text();
    System.out.println(myip);

    System.out.println("Mukunga Simon!!!!!");
    //print localhost ip address
    System.out.println(InetAddress.getLocalHost().getHostAddress());
    //print website ip address
    System.out.println(InetAddress.getByName("www.getinternet.no"));
    //print all ip addresses for a website
    InetAddress[] inetAddresses = InetAddress.getAllByName("www.getinternet.no");
    for(InetAddress inet : inetAddresses){
        System.out.println(inet);
    }


    visit.setDateCreated(Instant.now());
    System.out.println(visit);
    if (!visit.getUrl().contains("googlebot.com")){
      repository.save(visit);
    }

    List<Metrics> visits = repository.findAll();
    System.out.println("Metrics.save()  End OK!");
    return new ResponseEntity<>(visits, HttpStatus.OK);
  }
}