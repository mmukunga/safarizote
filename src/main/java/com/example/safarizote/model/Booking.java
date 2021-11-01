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
public class Booking {
  @Id @GeneratedValue Long id;
  @NonNull Long safariId;
  @NonNull String name;
  @NonNull String email;
  @NonNull String phone;
  @NonNull String address;
  @NonNull String message;
  @NonNull Instant dateCreated;
}