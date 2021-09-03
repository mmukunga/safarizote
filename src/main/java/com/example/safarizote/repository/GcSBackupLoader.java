package com.example.safarizote.repository;

import java.io.File;
import java.io.IOException;

    import org.slf4j.Logger;
    import org.slf4j.LoggerFactory;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.boot.CommandLineRunner;
    import org.springframework.stereotype.Component;
    
    @Component
    public class GcSBackupLoader implements CommandLineRunner {
        private static final Logger logger = LoggerFactory.getLogger(EmailLoader.class);
    
        @Autowired
        private EmailRepository repository;
        
       Long itemId = 0L;

        @Override
        public void run(String... args) throws Exception {
            System.out.println("The Directory is traversed.");
            File root = new File("D:/Bilder");
            Long parentId = 0L;
            System.out.println(itemId + " Directory: " + root.getCanonicalPath() + " FileName: " + root.getName() + " Parent: " + null);
            traverseDir(root, parentId);
        }

         public void traverseDir(File dir, Long parentId) {
            try {
                File[] files = dir.listFiles();
                for (File file : files) {
                    if (file.isDirectory()) {
                        System.out.println(itemId + " Directory: " + file.getCanonicalPath() + " FileName: " + file.getName() + " Parent: " + parentId);
                        traverseDir(file, itemId);
                    } else {
                        System.out.println(itemId + "      File: " + file.getCanonicalPath() + " FileName: " + file.getName() + " Parent: " + parentId);
                    }
                    itemId = itemId + 1;
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }


    }