package com.safari.springboot.safarizote.model;

import java.time.Instant;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Log {
    @Id @GeneratedValue Long id;
    private String path;
    @Column(columnDefinition = "TEXT")
    private String error;
    private Instant timestamp;
}
