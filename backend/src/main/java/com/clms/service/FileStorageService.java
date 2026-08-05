package com.clms.service;

import com.clms.exception.FileStorageException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.*;
import java.util.UUID;

@Service @Slf4j
public class FileStorageService {
    @Value("${app.file.upload-dir:./uploads}") private String uploadDir;

    public String storeFile(MultipartFile file) {
        return storeFile(file, "avatars");
    }

    public String storeFile(MultipartFile file, String subDirectory) {
        try {
            String originalFilename = file.getOriginalFilename();
            String extension = originalFilename != null && originalFilename.contains(".") 
                ? originalFilename.substring(originalFilename.lastIndexOf(".")) : "";
            String filename = UUID.randomUUID() + extension;
            Path targetDir = Paths.get(uploadDir, subDirectory);
            Files.createDirectories(targetDir);
            Path targetPath = targetDir.resolve(filename);
            Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);
            log.info("Stored file: {}/{}", subDirectory, filename);
            return filename;
        } catch (IOException e) {
            throw new FileStorageException("Failed to store file: " + e.getMessage());
        }
    }

    public void deleteFile(String subDirectory, String filename) {
        try {
            Path path = Paths.get(uploadDir, subDirectory, filename);
            Files.deleteIfExists(path);
        } catch (IOException e) {
            log.error("Failed to delete file {}/{}: {}", subDirectory, filename, e.getMessage());
        }
    }

    public Path getFilePath(String subDirectory, String filename) {
        return Paths.get(uploadDir, subDirectory, filename);
    }

    public String getFileUrl(String subDirectory, String filename) {
        return "/api/files/" + subDirectory + "/" + filename;
    }
}
