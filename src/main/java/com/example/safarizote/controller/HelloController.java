package com.example.safarizote.controller;

import java.util.Date;
import java.util.List;
import java.time.Instant;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import javax.servlet.http.HttpServletRequest;
import java.util.Enumeration;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;

import com.example.safarizote.model.Tracker;
import com.example.safarizote.repository.TrackerRepository;

@RestController
public class HelloController { 
  @Autowired
  private TrackerRepository repository;

    @RequestMapping(value = "/api/hello",  method={RequestMethod.GET})
    public ResponseEntity<List<Tracker>> getAllVisits(HttpServletRequest request) {
        System.out.println("Hello, the time at the server is now " + new Date() + "\n");
        String requestUrl = request.getRequestURI();
        System.out.println("Test Request URL:= " + requestUrl);
        Tracker visit = Tracker.builder().url(requestUrl).browser("gECKO kENYA").dateCreated(Instant.now()).build();

        Enumeration<String> headerNames = request.getHeaderNames();
        while(headerNames.hasMoreElements()) {
            String paramName = (String)headerNames.nextElement();
            System.out.print("<tr><td>" + paramName + "</td>\n");
            String paramValue = request.getHeader(paramName);
            System.out.println("<td> " + paramValue + "</td></tr>\n");
        }
        System.out.println("</table>\n</body></html>");

        System.out.println(request.getContextPath());
        repository.save(visit);
        List<Tracker> visits = repository.findAll();
        return ResponseEntity.ok(visits);
    }

    @RequestMapping(value = "/api/saveVisit",  method={RequestMethod.POST})
    public void save(@RequestBody Tracker visit) {
        repository.save(visit);
    }

}