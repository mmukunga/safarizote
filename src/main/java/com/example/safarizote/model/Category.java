package com.example.safarizote.model;

import java.time.Instant;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import java.util.HashSet;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
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
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    @Column(unique=true)
    @NonNull String name;
    @NonNull Instant dateCreated;

    @OneToOne
    @JoinColumn(name="parent_id")
    Category parent;
     
    @OneToMany(mappedBy="parent", cascade=CascadeType.ALL)
    Set<Category> children = new HashSet<>();
}