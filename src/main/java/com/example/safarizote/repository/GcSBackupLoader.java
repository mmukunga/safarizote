package com.example.safarizote.repository;

import java.io.File;
import java.io.IOException;

import com.example.safarizote.model.BackUp1;

import org.slf4j.Logger;
    import org.slf4j.LoggerFactory;
    import org.springframework.beans.factory.annotation.Autowired;
    import org.springframework.boot.CommandLineRunner;
    import org.springframework.stereotype.Component;
    
    @Component
    public class GcSBackupLoader implements CommandLineRunner {
        private static final Logger logger = LoggerFactory.getLogger(GcSBackupLoader.class);
    
        @Autowired
        private BackUp1Repository repository;
        

        @Override
        public void run(String... args) throws Exception {
            System.out.println("The Directory is traversed.");

            System.out.println("GcSBackupLoader..BACKUP TO DB!!");
            if (repository.count() > 0) {
                System.out.println("BACKUP TABLE NOT EMPTY!!..");
                return;
            }
            File root = new File("D:/Bilder");
            BackUp1 parent = repository.save(BackUp1.builder()
                .name("MyPC")
                .isDirectory(root.isDirectory())
                .parent(null)
                .dateCreated(root.lastModified())
                .build());

            logger.debug(parent.getId() 
                + " Directory: "  + root.getCanonicalPath() 
                + " FileName: " + root.getName() 
                + " Parent: " + null);
            traverseDir(root, parent);
        }

        public void traverseDir(File dir, BackUp1 parent) {
            try {
                File[] files = dir.listFiles();
                for (File file : files) {
                    if (file.isDirectory()) {                        
                        BackUp1 child = repository.save(BackUp1.builder()
                            .name(file.getName())
                            .path(file.getCanonicalPath())
                            .isDirectory(file.isDirectory())
                            .parent(parent)
                            .dateCreated(file.lastModified())
                            .build());
                        logger.debug(child.getId() 
                            + " Directory: " + child.getPath() 
                            + " FileName: " + child.getName() 
                            + " Parent: " + parent.getId());

                        traverseDir(file, child);
                    }
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }


    }