package com.example.safarizote.utils;

import org.slf4j.LoggerFactory;
import java.io.*;
import java.nio.file.*;
import java.nio.file.attribute.*;
import org.slf4j.Logger;

/**
 * This program copies a whole directory (including its sub files and
 * sub directories) to another, using the Java NIO API.
 *
 * @author www.codejava.net
 */
public class CopyDir extends SimpleFileVisitor<Path> {
    private static final Logger log = LoggerFactory.getLogger(CopyDir.class);
    private Path fromPath;
    private Path toPath;
    private CopyOption[] copyOptions;
    private long startTime = System.currentTimeMillis();

    public CopyDir(Path fromPath, Path toPath, CopyOption... copyOptions) {
        this.fromPath = fromPath;
        this.toPath = toPath;
        this.copyOptions = copyOptions;
    }

    public CopyDir(Path fromPath, Path toPath) {
        this(fromPath, toPath, LinkOption.NOFOLLOW_LINKS, StandardCopyOption.COPY_ATTRIBUTES);
    }

    @Override
    public FileVisitResult preVisitDirectory(Path dir,
                                             BasicFileAttributes attributes) {
        try {
            Path targetPath = toPath.resolve(fromPath.relativize(dir));
            if (!Files.exists(targetPath)) {
                Files.createDirectory(targetPath);
                log.warn("Created a new Directory: " + dir.getFileName());
            }
        } catch (IOException ex) {
            System.err.println(ex);
        }

        return FileVisitResult.CONTINUE;
    }

    @Override
    public FileVisitResult visitFile(Path file,
                                     BasicFileAttributes attributes) {

        try {
            Path targetFile = toPath.resolve(fromPath.relativize(file));

            if (!Files.exists(file)) {
                Files.copy(file, targetFile, copyOptions);
            }
        } catch (IOException ex) {
            System.err.println(ex);
        }

        return FileVisitResult.CONTINUE;
    }

    @Override
    public FileVisitResult postVisitDirectory(
            Path dir, IOException exc)  throws IOException {

        Path targetPath = toPath.resolve(fromPath.relativize(dir));
        String folderType = null;
        try {
            if (dir.toFile().lastModified() != targetPath.toFile().lastModified()) {
                final FileTime lastModified = FileTime.fromMillis(dir.toFile().lastModified());
                Files.setLastModifiedTime(targetPath, lastModified);
                folderType = "NEW";
                System.out.println("folderType:= " + folderType);
            }

            if(System.currentTimeMillis()-startTime > 1000) {
                startTime = System.currentTimeMillis();
            }

        } catch (IOException ex) {
            System.err.println(ex);
        }

        if (exc != null)
            throw exc;

        return FileVisitResult.CONTINUE;
    }
}
