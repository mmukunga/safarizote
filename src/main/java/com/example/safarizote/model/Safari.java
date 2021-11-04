package com.example.safarizote.model;

import java.time.Instant;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Column;
import javax.persistence.ManyToOne;
import javax.persistence.JoinColumn;
import javax.persistence.PrePersist;
import javax.persistence.FetchType;

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
  @NonNull String summary;
  @Column(columnDefinition="TEXT")
  @NonNull String details;
  @NonNull Double price;
  @NonNull Instant dateCreated;
  
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "booking_id")
  private Booking booking;

  @PrePersist
  private void setDate(){
    this.dateCreated = Instant.now();
  }
}