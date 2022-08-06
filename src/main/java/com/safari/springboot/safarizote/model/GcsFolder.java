package com.safari.springboot.safarizote.model;

public class GcsFolder {
    private String name;
    private String path;

    public GcsFolder(String name, String path) {
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