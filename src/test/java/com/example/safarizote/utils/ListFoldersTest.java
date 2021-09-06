package com.example.safarizote.utils;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.ArrayList;

public class ListFoldersTest {
    static List<Folder> folders = new ArrayList<>();
    public static void main(String args[]) {
        ListFoldersTest lft = new ListFoldersTest();
        String path = "D:/Bilder";
        File dir = new File(path);
        
        SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
        System.out.println("After Format : " + sdf.format(dir.lastModified()));

        Folder parent = Folder.builder()
            .name(dir.getName())
            .path(dir.getAbsolutePath())
            .parent(null)
            .dateCreated(dir.lastModified())
            .build(); 

        lft.traverseDir(path, parent);

        System.out.println("Hello, FOLDERS");

        for (Folder folder : folders) {
           // BackUp1 bkUp = repository.save(folder);
            System.out.println(folder.name
                + ", Path: "  + folder.path
                + ", DateCreated: " + folder.dateCreated
                + ", Parent: " + folder.parent);
        }
    }

    public void traverseDir(String path, Folder parent) {
        File dir = new File(path);
        File[] files = dir.listFiles();

        if (files == null) { 
            return;
        }
        
        for (File file : files) {
            if (file.isDirectory()) {
                Folder folder = Folder.builder()
                    .name(file.getName())
                    .path(dir.getAbsolutePath())
                    .parent(parent)
                    .dateCreated(file.lastModified())  
                    .build(); 
                folders.add(folder);    
                traverseDir(file.getAbsolutePath(), folder);
            } 
        }
    }
}