package com.safari.springboot.safarizote.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Table(name = "emoji")
public class Emoji {
    @Id @GeneratedValue Long id;
    @Column(name = "name")
    private String name;
    @Column(name = "label")
    private String label;
    @Column(name = "svg_url")
    private String svgUrl;
}