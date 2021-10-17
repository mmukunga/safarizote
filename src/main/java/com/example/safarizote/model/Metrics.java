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
  @NonNull String iPv4;
  @NonNull String hostname;
  @NonNull String org;
  @NonNull String timezone;
  @NonNull String city;
  @NonNull String countryCode;
  @NonNull String countryName;
  @NonNull String latitude;
  @NonNull String longitude;
  @NonNull String postal;
  @NonNull String state;
  @NonNull Instant dateCreated;
}