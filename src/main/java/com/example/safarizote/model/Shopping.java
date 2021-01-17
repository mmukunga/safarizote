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
  @Id @GeneratedValue Long id;
  @NonNull String store;
  @NonNull String product;
  @NonNull Double price;
  @NonNull Double quantity;
  @NonNull String name;
  @NonNull Instant dateCreated;

  @PrePersist
  private void setDate(){
    this.dateCreated = Instant.now();
  }
}