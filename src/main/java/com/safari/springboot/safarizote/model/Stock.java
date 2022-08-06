package com.safari.springboot.safarizote.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table
@Builder
@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
public class Stock {
    @Id @GeneratedValue Long id;
    @NonNull String code;
    @NonNull String timestamp;
    @NonNull String gmtoffset;
    @NonNull String open;
    @NonNull String high;
    @NonNull String low;
    @NonNull String close;
    @NonNull String volume;
    @NonNull String previousClose;
    @NonNull String change;
    @NonNull String change_p;
}
