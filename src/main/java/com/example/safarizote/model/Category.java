package com.example.safarizote.model;

import java.time.Instant;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;

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
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Category {
    @Id
    @GeneratedValue
    @EqualsAndHashCode.Include
    Long id;
    @NonNull
    @EqualsAndHashCode.Include
    String name;
    @NonNull
    Instant dateCreated;

    @OneToOne
    @JoinColumn(name = "parent_id")
    private Category parent;
     
    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL)
    private Set<Category> children = new HashSet<>();

    public void addChild(Category aSon){
        this.children.add(aSon);
    }
}