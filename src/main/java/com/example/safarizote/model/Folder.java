package com.example.safarizote.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.JoinColumn;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonBackReference;

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
    @GeneratedValue
    Long id;
    @NonNull
    String name;
    @Column(unique = true)
    @NonNull
    String path;

    @ManyToOne
    @JsonBackReference
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    @JoinColumn(name = "parent_id")
    Folder parent;
    @NonNull
    Long dateCreated;
}