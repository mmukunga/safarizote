package com.example.safarizote.repository;

import java.time.Instant;
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
        repository.deleteByHostname("www.wanja.co.ke"); 
        if (repository.count() > 0) {
            return;
        }
           
        repository.save(Metrics.builder()
            .hostname("www.wanja.co.ke")
            .city("Oslo")
            .org("Telia Norge AS") 
            .countryName("Norway")
            .countryCode("NO")
            .iPv4("84.212.216.80")
            .latitude("59.955")
            .longitude("10.859")
            .postal("0458")
            .state("Oslo County")
            .timezone("Europe/Oslo")
            .dateCreated(Instant.now())
            .build());
       
        repository.findAll().forEach((tracker) -> {
            logger.info("{}", tracker);
        });
       
    }
}