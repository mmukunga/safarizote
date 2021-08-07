package com.example.safarizote.model;

import java.time.Instant;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Metrics {
  @Id @GeneratedValue Long id;
  @NonNull String url;
  @NonNull String browser;
  /*
  @NonNull String city;
  @NonNull String organization; 
  @NonNull String connectionType;
  @NonNull String continent;
  @NonNull String continentCode;
  @NonNull String country;
  @NonNull String countryCode;
  @NonNull String currencyName;
  @NonNull String currencyCode;
  @NonNull String emoji;
  @NonNull String flagPng;
  @NonNull String flagSvg;
  @NonNull String ipAddress;
  @NonNull String latitude;
  @NonNull String longitude;
  @NonNull String postalCode;
  @NonNull String region;
  @NonNull String regionIsoCode;
  @NonNull String timezoneName;
  @NonNull String timezoneAbbreviation;
  @NonNull String currentTime;
  @NonNull String browserName;
  @NonNull String browserVersion;
  @NonNull String browserOsName;
  @NonNull String browserOsVersion;
  */
  @NonNull Instant dateCreated;
}