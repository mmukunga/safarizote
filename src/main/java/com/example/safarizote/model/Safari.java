package com.example.safarizote.model;

import java.time.Instant;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.FetchType;
import java.util.Set;

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
public class Safari {
  @Id @GeneratedValue Long id;
  @Column(columnDefinition="TEXT")
  @NonNull String title;
  @Column(columnDefinition="TEXT")
  @NonNull String description;
  @NonNull Double price;
  @NonNull Instant dateCreated;
  @OneToMany(cascade={CascadeType.ALL}, fetch=FetchType.EAGER)
  Set<Booking> bookings;

  @PrePersist
  private void setDate(){
    this.dateCreated = Instant.now();
  }
}