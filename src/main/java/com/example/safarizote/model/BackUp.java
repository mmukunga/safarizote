package com.example.safarizote.model;

import java.time.Instant;
import javax.persistence.CascadeType;
import javax.persistence.OneToMany;
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
public class BackUp {
    @Id @GeneratedValue Long id;
    @NonNull String name; 
    Boolean collapsed;
    Instant dateCreated;
    @OneToMany(cascade={CascadeType.ALL}, fetch=FetchType.EAGER)
    Set<BackUp> children;

}
