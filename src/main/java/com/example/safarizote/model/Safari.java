package com.example.safarizote.model;

import javax.persistence.Id;

import java.math.BigDecimal;
import java.time.Instant;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
public class Safari {
    @Id
    @GeneratedValue
    Long id;
    String title;
    String email;
    BigDecimal price;
    @Column(columnDefinition = "TEXT")
    String summary;
    @Column(columnDefinition = "TEXT")
    String description;
    String image;
    Instant dateCreated;
}