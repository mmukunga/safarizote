package com.example.safarizote.model;

import javax.persistence.Id;

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
public class Photo {
    @Id
    @GeneratedValue
    Long id;
    String title;
    Integer quantity;
    @Column(columnDefinition = "TEXT")
    String summary;
    @Column(columnDefinition = "TEXT")
    String description;
    String image;
    Instant dateCreated;
}