package com.example.safarizote.repository;

import java.io.File;
import java.net.URL;

import com.example.safarizote.model.BackUp1;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.io.FileInputStream;
import java.io.ObjectInputStream;

import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;

    
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

            ClassLoader classLoader = getClass().getClassLoader();
            File file = new File(getClass().getResource("slettMeg.ser").getFile());
            System.out.println("File Found : " + file.exists());

            //URL resource = getClass().getClassLoader().getResource("slettMeg.ser");
            FileInputStream fis = new FileInputStream(file);
            ObjectInputStream ois = new ObjectInputStream(fis);
            List<BackUp1> myList = (ArrayList<BackUp1>) Arrays.asList( (BackUp1[]) ois.readObject());
    
            for (BackUp1 backUp : myList) {
                System.out.println(backUp);
                BackUp1 bkUp = repository.save(backUp);
                System.out.println(bkUp);
                logger.debug(backUp.getId() 
                    + " Directory: "  + backUp.getPath() 
                    + " FileName: " + backUp.getName() 
                    + " Parent: " + backUp.getParent());
            }
    
        }
    }