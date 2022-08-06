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
@Table(name="analytics")
public class Analytics {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "country_code")
    private String countryCode;
    @Column(name = "country_name")
    private String countryName;
    @Column(name = "city")
    private String city;
    @Column(name = "postal")
    private String postal;
    @Column(name = "latitude")
    private String latitude;
    @Column(name = "longitude")
    private String longitude;
    @Column(name = "ipv4")
    private String ipv4;
    @Column(name = "state")
    private String state;
    @Column(name = "date_created")
    private Instant dateCreated;

    //{"country_code":"NO","country_name":"Norway","city":"Oslo","postal":"0171","latitude":59.9127,"longitude":10.7461,"IPv4":"84.212.199.3","state":"Oslo County"}

}
