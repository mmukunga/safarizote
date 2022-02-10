package com.example.demo.model;

import javax.persistence.Id;

import java.time.Instant;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
public class Statistics {
    @Id @GeneratedValue Long id;
    String pageview;
    String iPv4;
    String city;
    String countryCode;
    String countryName;
    Double latitude;
    Double longitude;
    String postal;
    String state;
    Integer quantity;
    Instant dateCreated;
}
