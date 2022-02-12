package com.example.demo.model;

import java.time.Instant;

import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
public class Event {
    @Id @GeneratedValue Long id;
    String title;
    String description;
    Instant date;
 
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="userAuth")
    UserAuth userAuth;
}
