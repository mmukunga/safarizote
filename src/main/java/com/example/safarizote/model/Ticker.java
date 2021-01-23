package com.example.safarizote.model;

import java.time.Instant;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

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

public class Ticker {
    @Id @GeneratedValue Long id;
    @NonNull String name;	
    @NonNull String symbol;
    @NonNull String description;
    @NonNull Double costPrice; 
    @NonNull Integer shares; 	
    @NonNull Boolean selected;
    @NonNull Instant dateCreated;
}