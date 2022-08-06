package com.safari.springboot.safarizote.model;

import java.time.Instant;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Table(name = "analytics")
public class Analytics {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "iPv4")
    private String iPv4;
    @Column(name = "city")
    private String city;
    @Column(name = "country_code")
    private String countryCode;
    @Column(name = "country_name")
    private String countryName;
    @Column(name = "latitude")
    private String latitude;
    @Column(name = "longitude")
    private String longitude;
    @Column(name = "postal")
    private String postal;
    @Column(name = "state")
    private String state;
    @Column(name = "date_created")
    private Instant dateCreated;

}
