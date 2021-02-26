package com.example.safarizote.model;

import java.time.Instant;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.FetchType;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BackUp {
    @Id
    @GeneratedValue
    Long id;
    @Column(unique = true)
    @NonNull String name; 
    Boolean collapsed;
    Instant dateCreated;
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "parent_id")
    @JsonIgnore
    BackUp parent;
    @OneToMany(mappedBy="parent", cascade=CascadeType.ALL)
    @EqualsAndHashCode.Exclude
    Set<BackUp> children = new HashSet<>();
}