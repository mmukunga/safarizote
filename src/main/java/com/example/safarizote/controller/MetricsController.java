package com.example.safarizote.controller;

import java.util.List;
import java.time.Instant;
import java.net.URL;
import java.net.UnknownHostException;
import java.net.InetAddress;
import java.io.IOException;
import java.io.BufferedReader;
import java.io.InputStreamReader;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

//import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpRequest;
import javax.servlet.http.HttpServletResponse;

import com.maxmind.geoip2.WebServiceClient;
import com.maxmind.geoip2.exception.GeoIp2Exception;
import com.maxmind.geoip2.model.CountryResponse;
import com.maxmind.geoip2.record.Country;


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


  @RequestMapping(value = "/api/myIp", produces = "application/json", method = RequestMethod.POST)
  public ResponseEntity<?> getTargets(ServerHttpRequest request) throws Exception{
    System.out.println("1.Mukunga Simon!!!!!");

    String license_key = "R3VrWVYzUWVtbHNjOGFEbGNhM3Rhb1dZcGpnQ3pQQkV3WlBPMmZHbA==";
    WebServiceClient client = new WebServiceClient.Builder(42, license_key).build();
    InetAddress ipAddress = InetAddress.getByName("84.212.216.80");
    // Do the lookup
    CountryResponse response = client.country(ipAddress);
    Country country = response.getCountry();
    System.out.println(country.getIsoCode());            // 'US'
    System.out.println(country.getName());               // 'United States'
    System.out.println(country.getNames().get("zh-CN")); // '美国'

     // Postal info
     Postal postal = response.getPostal();
     System.out.println(postal.getCode()); // '55455'
     Location location = response.getLocation(); 
     System.out.println("Latitude: "+ location.getLatitude()); // 44.9733  
     System.out.println("Longitude: "+ location.getLongitude()); // -93.2323

      String token = getToken(request);
      if (token == null) {
        System.out.println("2.Mukunga Simon!!!!!");
          return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
      }
      System.out.println("3.Mukunga Simon!!!!!");
      return new ResponseEntity<>(token, HttpStatus.OK);
  }

  private String getToken(ServerHttpRequest request) throws IOException{
      String header = request.getHeaders().getFirst("Authorization");

      System.out.println("Before Handshake");
      System.out.println(request.getHeaders().toString());
      System.out.println("?:" + request.getURI());
      System.out.println(":"  + request.getBody());


      System.out.println("4.Mukunga Simon!!!!!");
      if (header == null || header.trim().equals("")) {
          return null;
      }
      System.out.println("5.Mukunga Simon!!!!!");
      header = header.trim();
      if (!header.startsWith("Bearer ")) {
          return null;
      }
      System.out.println("6.Mukunga Simon!!!!!");
      System.out.println("Metrics.getToken(),  End OK!");
      return header.substring("Bearer ".length()).trim();
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
    System.out.println(visit);
    System.out.println("10.Mukunga Simon!!!!!");
    
    Document doc = Jsoup.connect("http://www.checkip.org").get();
    String myip = doc.getElementById("yourip").select("h1").first().select("span").text();
    System.out.println(myip);

    System.out.println("11.Mukunga Simon!!!!!");
    //print localhost ip address
    System.out.println(InetAddress.getLocalHost().getHostAddress());
    //print website ip address
    System.out.println(InetAddress.getByName("www.getinternet.no"));
    //print all ip addresses for a website
    InetAddress[] inetAddresses = InetAddress.getAllByName("www.getinternet.no");
    for(InetAddress inet : inetAddresses){
        System.out.println(inet);
    }

    URL url_name = new URL("http://bot.whatismyipaddress.com");
    BufferedReader sc = new BufferedReader(new InputStreamReader(url_name.openStream()));
    String systemipaddress = sc.readLine().trim();
    System.out.println(systemipaddress);

    URL url_name3 = new URL("https://api64.ipify.org?format=json");
    BufferedReader sc3 = new BufferedReader(new InputStreamReader(url_name3.openStream()));
    String systemipaddress3 = sc3.readLine().trim();
    System.out.println(systemipaddress3);

    URL url_name34 = new URL("http://bot.whatismyipaddress.com");
    BufferedReader sc34 = new BufferedReader(new InputStreamReader(url_name34.openStream()));
    String systemipaddress34 = sc34.readLine().trim();
    System.out.println(systemipaddress34);

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

    System.out.println("JSON!! Mukunga Simon!!!!!");

    URL url_name2 = new URL("https://ipinfo.io/json");
    BufferedReader sc2 = new BufferedReader(new InputStreamReader(url_name2.openStream()));
    String systemipaddress2 = sc2.readLine().trim();
    System.out.println(systemipaddress2);

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