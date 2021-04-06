package com.example.safarizote.model;

import java.time.Instant;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

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
public class Email {
    @Id @GeneratedValue Long id;
    @NonNull String name;
    @NonNull String title;
    @NonNull String email;
    @NonNull String phone;
    @NonNull String message;
    @NonNull Instant dateCreated;
}
