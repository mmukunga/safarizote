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
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

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
public class BackUp {
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    Long id;
    @Column(unique = true)
    @NonNull String name; 
    Boolean isChecked;
    Instant dateCreated;

    @ManyToOne
    @JoinColumn(name = "parent_id")
    private BackUp parent;

    @OneToMany(mappedBy="parent", cascade=CascadeType.ALL)
    Set<BackUp> children;
}