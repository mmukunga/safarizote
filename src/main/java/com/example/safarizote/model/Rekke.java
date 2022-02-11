package com.example.safarizote.model;

import java.util.Set;
import java.util.TreeSet;

public class Rekke {
  String pos;
  TreeSet<Integer> rad = new TreeSet<>();

  public Rekke(String pos) {
    this.pos = pos;
  }

  public void add(Integer tall) {
    rad.add(tall);
  }

  public String getPos() {
    return pos;
  }

  public Set<Integer> getRad() {
    return rad;
  }
}
