package com.example.demo.model;

import java.util.Set;

import javax.persistence.Id;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.OneToMany;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
public class Customer {
    @Id @GeneratedValue Long id;
    String name;
    String email;
    String phone;
    String message;
    @OneToMany(mappedBy = "user")
    Set<Event> events;
}
