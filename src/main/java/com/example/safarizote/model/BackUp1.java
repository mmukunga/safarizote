package com.example.safarizote.model;

import java.time.Instant;
import javax.persistence.OneToMany;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BackUp1 {
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    Long id;
    @NonNull String name; 
    @Column(unique = true)
    @NonNull String path;
    Boolean isDirectory;
    Long dateCreated;

    @ManyToOne
    @JsonBackReference
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JoinColumn(name = "parent_id")
    BackUp1 parent;
}