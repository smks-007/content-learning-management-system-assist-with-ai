package com.clms.service;

import com.clms.entity.Certificate;
import com.clms.entity.Course;
import com.clms.entity.User;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service @RequiredArgsConstructor @Slf4j
public class EmailService {
    private final JavaMailSender mailSender;
    @Value("${spring.mail.username:noreply@clms.com}") private String fromEmail;
    @Value("${app.frontend-url:http://localhost:5173}") private String frontendUrl;

    @Async
    public void sendVerificationEmail(User user, String token) {
        try {
            String link = frontendUrl + "/verify-email?token=" + token;
            String html = "<h2>Welcome to CLMS!</h2><p>Hi " + user.getFirstName() + ",</p>" +
                "<p>Please verify your email by clicking the link below:</p>" +
                "<a href='" + link + "' style='background:#6366f1;color:white;padding:10px 20px;border-radius:6px;text-decoration:none'>Verify Email</a>" +
                "<p>This link expires in 24 hours.</p>";
            sendHtmlEmail(user.getEmail(), "Verify your CLMS email", html);
        } catch (Exception e) { log.error("Failed to send verification email to {}: {}", user.getEmail(), e.getMessage()); }
    }

    @Async
    public void sendPasswordResetEmail(User user, String token) {
        try {
            String link = frontendUrl + "/reset-password?token=" + token;
            String html = "<h2>Password Reset Request</h2><p>Hi " + user.getFirstName() + ",</p>" +
                "<p>Click below to reset your password:</p>" +
                "<a href='" + link + "' style='background:#6366f1;color:white;padding:10px 20px;border-radius:6px;text-decoration:none'>Reset Password</a>" +
                "<p>This link expires in 1 hour. If you didn't request this, ignore this email.</p>";
            sendHtmlEmail(user.getEmail(), "Reset your CLMS password", html);
        } catch (Exception e) { log.error("Failed to send reset email to {}: {}", user.getEmail(), e.getMessage()); }
    }

    @Async
    public void sendEnrollmentConfirmation(User user, Course course) {
        try {
            String html = "<h2>Enrollment Confirmed!</h2><p>Hi " + user.getFirstName() + ",</p>" +
                "<p>You've successfully enrolled in: <strong>" + course.getTitle() + "</strong></p>" +
                "<a href='" + frontendUrl + "/courses/" + course.getId() + "/learn' style='background:#6366f1;color:white;padding:10px 20px;border-radius:6px;text-decoration:none'>Start Learning</a>";
            sendHtmlEmail(user.getEmail(), "Enrolled: " + course.getTitle(), html);
        } catch (Exception e) { log.error("Failed to send enrollment email: {}", e.getMessage()); }
    }

    @Async
    public void sendCertificateEmail(User user, Certificate cert) {
        try {
            String html = "<h2>Congratulations! 🎉</h2><p>Hi " + user.getFirstName() + ",</p>" +
                "<p>You've earned a certificate! Verification code: <strong>" + cert.getVerificationCode() + "</strong></p>" +
                "<a href='" + frontendUrl + "/certificates' style='background:#6366f1;color:white;padding:10px 20px;border-radius:6px;text-decoration:none'>View Certificate</a>";
            sendHtmlEmail(user.getEmail(), "Certificate Earned!", html);
        } catch (Exception e) { log.error("Failed to send certificate email: {}", e.getMessage()); }
    }

    private void sendHtmlEmail(String to, String subject, String htmlContent) throws Exception {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
        helper.setFrom(fromEmail);
        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(htmlContent, true);
        mailSender.send(message);
    }
}
