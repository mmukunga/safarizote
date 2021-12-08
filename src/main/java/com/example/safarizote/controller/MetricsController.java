package com.example.safarizote.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.StringTokenizer;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import java.time.Instant;
import java.io.IOException;
import java.net.InetAddress;

import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.safarizote.model.Metrics;
import com.example.safarizote.repository.MetricsRepository;

@RestController
public class MetricsController { 
  @Autowired
  private MetricsRepository repository;

  @GetMapping("/api/healthCheck")
  public ResponseEntity<String> healthCheck() {
      String status = "healthCheck: OK!!";
      return ResponseEntity.ok().body(status);
  }

  @GetMapping("/api/allHits")
  public ResponseEntity<String> findAll(HttpServletRequest request) throws Exception {
    System.out.println("request = " + request);
    HttpSession session = request.getSession (true);  
    
    InetAddress ip1 = InetAddress.getByName("www.javatpoint.com");
		System.out.println("Host Name: "  + ip1.getHostName());
		System.out.println("IP Address: " + ip1.getHostAddress());

    session.setAttribute ("isRecorded", Boolean.TRUE);
    //Save a variable "isRecorded" in the session object and assign the value
    String ip = getIp (request);//User ip

    String browser = getBrowser (request);//User's browser
    String os = getSysInfo (request);//Users use the system
    String source = request.getHeader ("Referer");//Access source
    String url = request.getRequestURI ();//User's current access path
       
    System.out.println ("ip:" + ip);
    System.out.println ("os:" + os.trim ());
    System.out.println ("browser:" + browser.trim ());
    System.out.println ("source:" + source);
    System.out.println ("url:" + url);

    Map<String, Object> map = new HashMap<>();
    InetAddress serverHost = InetAddress.getLocalHost();
    map.put("hostName", serverHost.getHostName());
    map.put("hostAddress", serverHost.getHostAddress());

    return ResponseEntity.ok().body(request.toString());
  }

  @PostMapping("/api/saveVisit")
  public ResponseEntity<List<Metrics>> save(@RequestBody Metrics metrics) throws IOException {
    System.out.println(metrics);
    metrics.setDateCreated(Instant.now());
    if (!metrics.getHostname().contains("googlebot.com")){
      repository.save(metrics);
    }
 
    List<Metrics> visits = repository.findAll();
    return ResponseEntity.ok().body(visits);
  }

  @GetMapping("/api/request")
  public String getRequest(HttpServletRequest request) {
      System.out.println("request = " + request);
      HttpSession session = request.getSession (true);  
      
      
      session.setAttribute ("isRecorded", Boolean.TRUE);
      //Save a variable "isRecorded" in the session object and assign the value
       String ip = getIp (request);//User ip
       String browser = getBrowser (request);//User's browser
       String os = getSysInfo (request);//Users use the system
       String source = request.getHeader ("Referer");//Access source
       String url = request.getRequestURI ();//User's current access path
       

       System.out.println ("ip:" + ip);
        System.out.println ("os:" + os.trim ());
        System.out.println ("browser:" + browser.trim ());
        System.out.println ("source:" + source);
        System.out.println ("url:" + url);

      return request.toString();
  }

  public String getIp (HttpServletRequest httpRequest) {          
    String ipAddress = httpRequest.getHeader("X-FORWARDED-FOR");  
      if (ipAddress == null) {  
          ipAddress = httpRequest.getRemoteAddr();  
      }

      return ipAddress;

    }

    public String getBrowser (HttpServletRequest httpRequest) {
      String agent = httpRequest.getHeader ("User-Agent");
      String browserVersion = "";           
      if (agent.indexOf ("MSIE") > 0) {
        //Read the User-Agent value from the request header
          browserVersion = "IE";
      } else if (agent.indexOf ("Firefox") > 0) {
          browserVersion = "Firefox";
      } else if (agent.indexOf ("Chrome") > 0) {
          browserVersion = "Chrome";
      } else if (agent.indexOf ("Safari") > 0) {
          browserVersion = "Safari";
      } else if (agent.indexOf ("Camino") > 0) {
          browserVersion = "Camino";
      } else if (agent. indexOf ("Konqueror") > 0) {
          browserVersion = "Konqueror";
      } else if (agent.indexOf ("QQBrowser") > 0) {
          browserVersion = "QQBrowser ";           
          if (" ".equals (browserVersion)) {
          }
          StringTokenizer st = new StringTokenizer (agent, "(;)");
          while (st.hasMoreElements ()) {  
            browserVersion = st.nextToken ();
          }  
      }
      return browserVersion;
    }

    public String getSysInfo (HttpServletRequest httpRequest) {
      String agent = httpRequest.getHeader ("User-Agent");
      return agent;
    }
}