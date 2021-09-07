package com.example.safarizote.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;

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
 public class Folder {
     @NonNull String name;
     @Column(unique = true)
     @NonNull String path;
     @JoinColumn(name = "parent_id")
     Folder parent;
     @NonNull Long dateCreated;

     public String toString() {
         return (
             "{ 'name': " + "'" + name + "'" + 
              ", 'path': " + "'" + path + "'" + 
              ", 'dateCreated': " + "'" + dateCreated + "'" + 
              ", 'parent': " +  parent + 
             "}");
     }
 }