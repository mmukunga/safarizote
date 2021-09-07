package com.example.safarizote.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.JoinColumn;


import java.time.Instant;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonBackReference;

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

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.ToString;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
 public class Folder {
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    Long id;
    @NonNull String name;
    @Column(unique = true)
    @NonNull String path;

    @ManyToOne
    @JsonBackReference
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JoinColumn(name = "parent_id")
    Folder parent;
    @NonNull Long dateCreated;

    public String toString() {
        return (
            "{ 'name': " + "'" + name + "'" + 
             ", 'path': " + "'" + path + "'" + 
             ", 'dateCreated': " + "'" + dateCreated + "'" + 
             ", 'parent': " +  parent + 
            "}");
    }
 }