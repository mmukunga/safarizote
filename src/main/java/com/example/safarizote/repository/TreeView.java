package com.example.safarizote.repository;


import java.io.File;
import java.io.IOException;

public class TreeView {
    public static File root = new File("D:/Bilder"); // current directory
    public static Long id = 0L;
    public TreeView() throws IOException {
        System.out.println("directory:" + root.getCanonicalPath());
    }

	public static void main(String[] args) throws IOException {
		TreeView tv = new TreeView(); // current directory
		tv.traverseDir(root, 0L);
	}

	public void traverseDir(File dir, Long parentId) {
		try {
			File[] files = dir.listFiles();
			for (File file : files) {
				if (file.isDirectory()) {
					System.out.println(id + ".directory:" + file.getCanonicalPath() + " Parent: " + parentId);
					traverseDir(file, id);
				} else {
					System.out.println("     " + id + ".file:" + file.getCanonicalPath() + " Parent: " + parentId);
				}
                id += 1;
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}