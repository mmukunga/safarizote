package com.example.safarizote.repository;

import java.time.Instant;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.safarizote.model.Tracker;

@Component
public class TrackerLoader implements CommandLineRunner {
    private static final Logger logger = LoggerFactory.getLogger(TrackerLoader.class);

    @Autowired
    private TrackerRepository repository;

    @Override
    public void run(String... args) throws Exception {
        if (repository.count() > 0) {
            return;
        }
        
        repository.save(Tracker.builder().url("www.wanja.co.ke").browser("Safari").dateCreated(Instant.now()).build());
        repository.save(Tracker.builder().url("http://kiwani.com").browser("Microsft Explorer Edge").dateCreated(Instant.now()).build());
        repository.save(Tracker.builder().url("https://mahi.org").browser("Mozilla Firefox").dateCreated(Instant.now()).build());
        repository.save(Tracker.builder().url("www.wanja.co.ke").browser("Safari").dateCreated(Instant.now()).build());
        repository.save(Tracker.builder().url("http://kiwani.com").browser("Microsft Explorer Edge").dateCreated(Instant.now()).build());
        repository.save(Tracker.builder().url("http://1212.1212.1212:5252/saba.edu").browser("Android").dateCreated(Instant.now()).build());
        repository.save(Tracker.builder().url("https://tulinambo.congo.env").browser("TikTok").dateCreated(Instant.now()).build());
        repository.save(Tracker.builder().url("www.wanja.co.ke").browser("Safari").dateCreated(Instant.now()).build());
        repository.save(Tracker.builder().url("http://1212.1212.1212:5252/saba.edu").browser("Android").dateCreated(Instant.now()).build());
        repository.save(Tracker.builder().url("https://tulinambo.congo.env").browser("TikTok").dateCreated(Instant.now()).build());
        repository.save(Tracker.builder().url("www.wanja.co.ke").browser("Safari").dateCreated(Instant.now()).build());
        repository.save(Tracker.builder().url("http://kiwani.com").browser("Microsft Explorer Edge").dateCreated(Instant.now()).build());
        repository.save(Tracker.builder().url("http://1212.1212.1212:5252/saba.edu").browser("Android").dateCreated(Instant.now()).build());
        repository.save(Tracker.builder().url("https://tulinambo.congo.env").browser("TikTok").dateCreated(Instant.now()).build());
        repository.save(Tracker.builder().url("http://kiwani.com").browser("Microsft Explorer Edge").dateCreated(Instant.now()).build());
        repository.save(Tracker.builder().url("http://1212.1212.1212:5252/saba.edu").browser("Android").dateCreated(Instant.now()).build());
        repository.save(Tracker.builder().url("https://tulinambo.congo.env").browser("TikTok").dateCreated(Instant.now()).build());
        repository.save(Tracker.builder().url("www.wanja.co.ke").browser("Safari").dateCreated(Instant.now()).build());

        repository.findAll().forEach((tracker) -> {
            logger.info("{}", tracker);
        });
    }
}