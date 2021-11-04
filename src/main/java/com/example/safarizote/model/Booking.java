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


import javax.persistence.OneToMany;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.FetchType;


@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Booking {
  @Id @GeneratedValue Long id;
  @NonNull String name;
  @NonNull String email;
  @NonNull String phone;
  @NonNull String address;
  @NonNull String adults;
  @NonNull String children;
  @NonNull String message;
  @NonNull Instant date;
  @OneToMany(mappedBy="booking", cascade=CascadeType.ALL, fetch=FetchType.EAGER)
  Set<Safari> safaris;
}