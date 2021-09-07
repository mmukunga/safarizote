package com.example.safarizote.utils;

import java.io.File;
import java.io.BufferedWriter;
import java.io.FileWriter;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.ArrayList;
import org.json.JSONObject;
import com.example.safarizote.model.Folder;

public class ListFolders {
    static List<Folder> folders = new ArrayList<>();
    public static void main(String args[]) throws Exception {
        ListFolders lft = new ListFolders();
        String path = "D:/Bilder";
        File dir = new File(path);
        
        File file = new File("D:/Temps/safarizote/src/main/resources/example.txt");
        BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(file));

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

        for (Folder folder : folders) {; 
            String jsonString = (folder.toString()).replace("\\", "/");
            JSONObject obj = new JSONObject(jsonString);
            bufferedWriter.write(obj.toString());
            bufferedWriter.newLine();
        }
        bufferedWriter.flush();
        bufferedWriter.close();
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