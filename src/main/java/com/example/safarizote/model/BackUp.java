package com.example.safarizote.model;

import java.util.List;
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
public class BackUp {
    @Id @GeneratedValue Long id;
    @NonNull String name; 
    Boolean collapsed;
    Instant dateCreated;
    List<BackUp> children;

}
