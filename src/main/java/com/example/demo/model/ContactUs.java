package com.example.demo.model;

import java.time.Instant;

import javax.persistence.Id;
import javax.persistence.Entity;
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
public class ContactUs {
    @Id @GeneratedValue Long id;
    String username;
    String email;
    String phone;
    String gender;
    String message;
    Instant date;
}
