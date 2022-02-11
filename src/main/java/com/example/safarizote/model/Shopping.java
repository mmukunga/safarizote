package com.example.safarizote.model;

import java.time.Instant;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.PrePersist;

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
public class Shopping {
  @Id
  @GeneratedValue
  Long id;
  @NonNull
  String product;
  @NonNull
  String shop;
  @NonNull
  Double price;
  @NonNull
  Instant dateCreated;

  @PrePersist
  private void setDate() {
    this.dateCreated = Instant.now();
  }
}