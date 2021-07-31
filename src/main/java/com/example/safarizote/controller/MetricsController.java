package com.example.safarizote.controller;

import java.util.List;
import java.time.Instant;
import java.net.URL;
import java.net.UnknownHostException;
import java.net.InetAddress;

import java.net.*;
import java.io.*;

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

    //print localhost ip address
    System.out.println(InetAddress.getLocalHost().getHostAddress());
    //print website ip address
    System.out.println(InetAddress.getByName("www.journaldev.com"));
    //print all ip addresses for a website
    InetAddress[] inetAddresses = InetAddress.getAllByName("www.google.com");
    for(InetAddress inet : inetAddresses){
        System.out.println(inet);
    }

    URL url_name = new URL("http://bot.whatismyipaddress.com");
    BufferedReader sc = new BufferedReader(new InputStreamReader(url_name.openStream()));
    String systemipaddress = sc.readLine().trim();
    System.out.println(systemipaddress);

    URL whatismyip = new URL("http://checkip.amazonaws.com");
    BufferedReader in = null;
    try {
        in = new BufferedReader(new InputStreamReader(
                whatismyip.openStream()));
        String ip = in.readLine();
        System.out.println(ip);
    } finally {
        if (in != null) {
            try {
                in.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    BufferedReader in2 = null;
    URL ipAdress = new URL("http://myexternalip.com/raw");
    try {
        in2 = new BufferedReader(new InputStreamReader(ipAdress.openStream()));
        String ip2 = in2.readLine();
        System.out.println(ip2);
      } finally {
        if (in2 != null) {
            try {
                in2.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
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