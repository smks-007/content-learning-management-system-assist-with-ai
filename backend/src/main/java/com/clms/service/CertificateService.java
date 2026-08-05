package com.clms.service;

import com.clms.dto.response.CertificateDto;
import com.clms.entity.Certificate;
import com.clms.exception.ResourceNotFoundException;
import com.clms.repository.CertificateRepository;
import com.clms.repository.CourseRepository;
import com.clms.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class CertificateService {
    private final CertificateRepository certificateRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    
    public List<CertificateDto> getStudentCertificates(UUID studentId) {
        return certificateRepository.findByStudentId(studentId).stream()
                .map(c -> {
                    CertificateDto dto = new CertificateDto();
                    dto.setId(c.getId());
                    dto.setVerificationCode(c.getVerificationCode());
                    return dto;
                }).collect(Collectors.toList());
    }
    
    public CertificateDto getCertificateById(UUID id) {
        Certificate c = certificateRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Certificate", "id", id));
        CertificateDto dto = new CertificateDto();
        dto.setId(c.getId());
        dto.setVerificationCode(c.getVerificationCode());
        return dto;
    }
    
    public CertificateDto verifyCertificate(String code) {
        Certificate c = certificateRepository.findByVerificationCode(code)
                .orElseThrow(() -> new ResourceNotFoundException("Certificate", "code", code));
        CertificateDto dto = new CertificateDto();
        dto.setId(c.getId());
        dto.setVerificationCode(c.getVerificationCode());
        return dto;
    }
    
    public String generateCertificateHtml(UUID certId) {
        Certificate c = certificateRepository.findById(certId)
                .orElseThrow(() -> new ResourceNotFoundException("Certificate", "id", certId));
        return "<html><body><h1>Certificate of Completion</h1><p>Student ID: " + c.getStudent().getId() + "</p><p>Course ID: " + c.getCourse().getId() + "</p><p>Code: " + c.getVerificationCode() + "</p></body></html>";
    }
}
