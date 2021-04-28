package com.example.safarizote.model;

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
public class BigCity {
    @Id @GeneratedValue Long id;
    @NonNull String country;
    @NonNull String name;
    @NonNull String state;
    @NonNull Coord coord;
}
