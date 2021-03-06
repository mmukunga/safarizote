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
        // repository.deleteAll();
        
        if (repository.count() > 0) {
            return;
        }
        
        repository.save(Metrics.builder().url("www.wanja.co.ke").browser("Safari").dateCreated(Instant.now()).build());
        repository.save(Metrics.builder().url("http://kiwani.com").browser("Microsft Explorer Edge").dateCreated(Instant.now()).build());
        repository.save(Metrics.builder().url("https://mahi.org").browser("Mozilla Firefox").dateCreated(Instant.now()).build());
        repository.save(Metrics.builder().url("207.51-175-209.customer.lyse.net").browser("Android").dateCreated(Instant.now()).build());
        repository.save(Metrics.builder().url("https://tulinambo.congo.env").browser("TikTok").dateCreated(Instant.now()).build());

        repository.findAll().forEach((tracker) -> {
            logger.info("{}", tracker);
        });
    }
}