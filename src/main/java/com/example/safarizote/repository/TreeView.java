package com.example.safarizote.repository;

import java.io.File;
import java.io.IOException;
import java.io.FileInputStream;
import java.io.ObjectInputStream;
import com.example.safarizote.model.BackUp1;

import java.io.FileOutputStream;
import java.io.ObjectOutputStream;
import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;

public class TreeView {
    public static File root = new File("D:/Bilder"); 
    public static File file = new File("/Temps/safarizote/src/main/resources/slettMeg.ser");
	public static List<BackUp1> list = new ArrayList<>();

    public TreeView() throws IOException {
        System.out.println("Directory:" + root.getCanonicalPath());
    }

	public static void main(String[] args) throws Exception {

		if (!file.delete() && file.exists()) {
			throw new IOException("failed to delete " + file);
		   }

		if (file.createNewFile()) {					
			System.out.println("File has been created.");
		} else {				
			System.out.println("File already exists.");
		}		

		TreeView tv = new TreeView(); 
		tv.startBackUp();
        
		FileOutputStream fileOut = new FileOutputStream("/Temps/safarizote/src/main/resources/slettMeg.ser");
		ObjectOutputStream out = new ObjectOutputStream(fileOut);
			out.writeObject(list);
			out.reset();
			out.close();
			fileOut.close();

		System.out.println("\n=====> 2. New Enhanced For loop Example..");
        for (BackUp1 temp : list) {
            System.out.println(temp);
        }
	}

	public void startBackUp() throws IOException {
		BackUp1 parent = BackUp1.builder()
				.name("MyPC")
				.path(root.getAbsolutePath())
				.isDirectory(root.isDirectory())
				.parent(null)
				.dateCreated(root.lastModified())
				.build();

		list.add(parent);
		traverseDir(root, parent);		
	}

	public void traverseDir(File dir, BackUp1 parent) {
		try {
			File[] files = dir.listFiles();
			for (File file : files) {
				if (file.isDirectory()) {
					BackUp1 child = BackUp1.builder()
						.name(file.getName())
						.path(file.getAbsolutePath())
						.isDirectory(file.isDirectory())
						.parent(parent)
						.dateCreated(file.lastModified())
						.build();	
					list.add(child);					
					traverseDir(file, child);
				} 
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public List<BackUp1> listFolders() throws Exception {
        FileInputStream fis = new FileInputStream(new File("/Temps/safarizote/src/main/resources/slettMeg.ser"));
        ObjectInputStream ois = new ObjectInputStream(fis);
		List<BackUp1> myList = (ArrayList<BackUp1>) Arrays.asList( (BackUp1[]) ois.readObject() );

        for (BackUp1 backUp : myList) {
			System.out.println(backUp);
		}

		return myList;
	}
}