package com.safari.springboot.safarizote.repository;

import static org.assertj.core.api.Assertions.assertThat;

import java.text.ParseException;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.safari.springboot.safarizote.model.Analytics;

@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class AnalyticsRepositoryTests {
    @Autowired
    private AnalyticsRepository repository;   

    @Test
    public void findByIdShouldReturnAnalytics() {
       Optional<Analytics> analytics = repository.findById(1L);
       assertThat(analytics).isPresent();
       assertThat(analytics.get().getIPv4()).isEqualTo("84.212.199.3");
    }

    @Test
    public void findByIPv4ShouldReturnAnalytics() {      
       List<Analytics> analytics = repository.findByIPv4("84.212.199.3");
       assertThat(analytics).hasSize(1);
       assertThat(analytics.get(0).getId()).isNotNull();
    }

    @Test
    public void deleteUser() {
		List<Analytics> analytics = repository.findByIPv4("84.212.199.3");
		assertThat(analytics).hasSize(1);
    	repository.deleteById((long) 7);
    	analytics = repository.findByIPv4("84.212.199.3");
    	assertThat(analytics).hasSize(0);
    }

    @Test
    public void createNewAnalytics() throws ParseException {
    	Analytics analytics = Analytics.builder().iPv4("84.212.199.3")
        .city("Oslo")
        .countryCode("NO")
        .countryName("Norway")
        .dateCreated(Instant.now())
        .build();

    	repository.save(analytics);
    	assertThat(analytics.getId()).isNotNull();
    }    
}
