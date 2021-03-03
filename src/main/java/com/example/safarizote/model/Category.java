package com.example.safarizote.model;

import java.time.Instant;
import javax.persistence.OneToMany;
import java.util.Set;
import javax.persistence.Entity;
import javax.persistence.FetchType;
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id")
    private Category parent;
     
    @OneToMany(mappedBy="parent")
    Set<Category> children;

    public void addChild(Category aSon){
        this.children.add(aSon);
    }
}