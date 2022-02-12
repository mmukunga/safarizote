package com.example.demo.dbLoaders;

import java.time.Instant;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.demo.model.Analytics;
import com.example.demo.repository.AnalyticsRepository;

@Component
public class AnalyticsLoader implements CommandLineRunner {
    private static final Logger logger = LoggerFactory.getLogger(AnalyticsLoader.class);

    @Autowired
    private AnalyticsRepository repository;

    @Override
    public void run(String... args) throws Exception {
        logger.info("AnalyticsLoader has started");
        if (repository.count() > 0) {
            logger.info("AnalyticsLoader has ENDED!!");
            return;
        }

        repository.save(Analytics.builder()
                .pageview("/")
                .city("Oslo")
                .countryName("Norway")
                .countryCode("NO")
                .iPv4("84.212.216.80")
                .latitude(59.955)
                .longitude(10.859)
                .postal("0458")
                .state("Oslo County")
                .quantity(1)
                .dateCreated(Instant.now())
                .build());

        repository.save(Analytics.builder()
                .pageview("/contactUs")
                .city("Oslo")
                .countryName("Norway")
                .countryCode("NO")
                .iPv4("84.212.216.80")
                .latitude(59.955)
                .longitude(10.859)
                .postal("0458")
                .state("Oslo County")
                .quantity(10)
                .dateCreated(Instant.now())
                .build());
        repository.save(Analytics.builder()
                .pageview("/safaris")
                .city("Drammen")
                .countryName("Norway")
                .countryCode("NO")
                .iPv4("84.212.216.80")
                .latitude(59.955)
                .longitude(10.859)
                .postal("0458")
                .state("Oslo County")
                .quantity(8)
                .dateCreated(Instant.now())
                .build());
        repository.save(Analytics.builder()
                .pageview("/shoppings")
                .city("Oslo")
                .countryName("Norway")
                .countryCode("NO")
                .iPv4("84.212.216.80")
                .latitude(59.955)
                .longitude(10.859)
                .postal("0458")
                .state("Oslo County")
                .quantity(5)
                .dateCreated(Instant.now())
                .build());
        repository.findAll().forEach((tracker) -> {
            logger.info("{}", tracker);
        });

    }
}