package com.example.safarizote.model;

public class DaoObject {
    private String name;
    private String path;

    public DaoObject(String name, String path) {
        this.name = name;
        this.path = path;
    }

    public String getName() {
        return name;
    }

    public String getPath() {
        return path;
    }
}