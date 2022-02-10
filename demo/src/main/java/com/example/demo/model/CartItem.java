package com.example.demo.model;

import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import java.math.BigDecimal;
import java.time.Instant;

import javax.persistence.CascadeType;
import javax.persistence.Column;
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
public class CartItem {
    @Id @GeneratedValue Long id;
    String title;
    String email;
    BigDecimal price;
    Integer quantity;
    @Column(columnDefinition="TEXT")
    String summary;
    @Column(columnDefinition="TEXT")
    String description;
    String image;
    Instant dateCreated;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "cart_id")
    private Cart cart;
}