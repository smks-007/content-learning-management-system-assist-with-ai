package com.clms.controller;

import com.clms.exception.ResourceNotFoundException;
import com.clms.service.FileStorageService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.MalformedURLException;
import java.nio.file.Path;

@RestController
@RequestMapping("/api/files")
@RequiredArgsConstructor
@Tag(name = "File", description = "File serving APIs")
public class FileController {

    private final FileStorageService fileStorageService;

    @GetMapping("/{subDir}/{filename:.+}")
    public ResponseEntity<Resource> serveFile(@PathVariable String subDir, @PathVariable String filename) {
        try {
            Path filePath = fileStorageService.getFilePath(subDir, filename);
            Resource resource = new UrlResource(filePath.toUri());
            if (!resource.exists()) {
                throw new ResourceNotFoundException("File", "name", filename);
            }
            String contentType = "application/octet-stream";
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + filename + "\"")
                    .body(resource);
        } catch (MalformedURLException e) {
            throw new ResourceNotFoundException("File", "name", filename);
        }
    }
}
