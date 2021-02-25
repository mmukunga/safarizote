package com.example.safarizote.model;

import java.time.Instant;
import javax.persistence.OneToMany;
import javax.persistence.FetchType;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

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
    @Id
    @GeneratedValue
    Long id;
    @NonNull String name; 
    Boolean collapsed;
    Instant dateCreated;
    @ManyToOne(fetch=FetchType.LAZY, optional=true)
    @JoinColumn(name="parent_id", referencedColumnName="id")
    BackUp parent;
    @OneToMany(mappedBy="parent_id", cascade = CascadeType.ALL)
    Set<BackUp> children = new HashSet<>();
}