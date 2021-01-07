package com.example.safarizote.utils;


import com.zaxxer.hikari.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.*;
import javax.sql.DataSource;

@Configuration
public class DatabaseConfig {

  @Value("${spring.datasource.url}")
  private String dbUrl;
  @Value("${spring.datasource.username}")
  String username;

  @Value("${spring.datasource.password}")
  String password;

  @Bean
  public DataSource dataSource() {
      HikariConfig config = new HikariConfig();
      config.setJdbcUrl(dbUrl);
      config.setUsername(username);
      config.setPassword(password);
      return new HikariDataSource(config);
  }
}