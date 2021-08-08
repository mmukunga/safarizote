package com.example.safarizote.repository;

import java.time.Instant;
import java.util.List;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.safarizote.model.Metrics;

@Component
public class MetricsLoader implements CommandLineRunner {
    private static final Logger logger = LoggerFactory.getLogger(MetricsLoader.class);

    @Autowired
    private MetricsRepository repository;

    @Override
    public void run(String... args) throws Exception {
        // repository.deleteAll();        
        //Set<Metrics> m = repository.deleteByUrl("www.wanja.co.ke"); 
        List<Metrics> rms = repository.deleteByUrl("www.wanja.co.ke"); 

        if (repository.count() > 0) {
            return;
        }
           
        repository.save(Metrics.builder().url("www.wanja.co.ke").browser("Safari")
        .city("Oslo")
        .organization("Telia Norge AS") 
        .connectionType("Simon Test3")
        .continent("Cable/DSL")
        .continentCode("Get AS")
        .country("Norway")
        .countryCode("NO")
        .currencyName("Norwegian Krone")
        .currencyCode("NOK")
        .emoji("NO")
        .flagPng("https://static.abstractapi.com/country-flags/NO_flag.png")
        .flagSvg("https://static.abstractapi.com/country-flags/NO_flag.svn")
        .ipAddress("84.212.216.80")
        .latitude("59.955")
        .longitude("10.859")
        .postalCode("0458")
        .region("Oslo County")
        .regionIsoCode("03")
        .timezoneName("Europe/Oslo")
        .timezoneAbbreviation("CEST")
        .presentTime("11:30:31")
        .browserName("Chrome")
        .browserVersion("92.0.4515.131")
        .browserOsName("Windows")
        .browserOsVersion("NT 10.0")
        .dateCreated(Instant.now()).build());

        //repository.save(Metrics.builder().url("http://kiwani.com").browser("Microsft Explorer Edge").dateCreated(Instant.now()).build());
        //repository.save(Metrics.builder().url("https://mahi.org").browser("Mozilla Firefox").dateCreated(Instant.now()).build());
        //repository.save(Metrics.builder().url("207.51-175-209.customer.lyse.net").browser("Android").dateCreated(Instant.now()).build());
        //repository.save(Metrics.builder().url("https://tulinambo.congo.env").browser("TikTok").dateCreated(Instant.now()).build());
        /*
        repository.findAll().forEach((tracker) -> {
            logger.info("{}", tracker);
        });
        */
    }
}