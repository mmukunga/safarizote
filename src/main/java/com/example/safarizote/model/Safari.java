package com.example.safarizote.model;

import java.time.Instant;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
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
@Table
@Builder
public class Safari {
  @Id @GeneratedValue Long id;
  @NonNull String title;
  @Column(columnDefinition="TEXT")
  @NonNull String description;
  @NonNull Instant dateCreated;
  @OneToMany(cascade={CascadeType.ALL}, fetch=FetchType.EAGER)
  Set<Customer> customers;

  @PrePersist
  private void setDate(){
    this.dateCreated = Instant.now();
  }
}