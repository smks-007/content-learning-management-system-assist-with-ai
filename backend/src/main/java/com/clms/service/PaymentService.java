package com.clms.service;

import com.clms.dto.request.PaymentCreateRequest;
import com.clms.dto.response.PaymentDto;
import com.clms.dto.response.PaymentIntentResponse;
import com.clms.entity.Course;
import com.clms.entity.Payment;
import com.clms.entity.Student;
import com.clms.entity.User;
import com.clms.exception.ResourceNotFoundException;
import com.clms.repository.CourseRepository;
import com.clms.repository.PaymentRepository;
import com.clms.repository.StudentRepository;
import com.clms.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class PaymentService {
    private final PaymentRepository paymentRepository;
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final CourseService courseService;

    public PaymentIntentResponse createPaymentIntent(PaymentCreateRequest request, UUID studentId) {
        Course course = courseRepository.findById(request.getCourseId())
                .orElseThrow(() -> new ResourceNotFoundException("Course", "id", request.getCourseId()));
        Student student = studentRepository.findByUserId(studentId).orElse(null);
        
        Payment payment = new Payment();
        payment.setCourse(course);
        payment.setStudent(student);
        payment.setStatus(Payment.PaymentStatus.PENDING);
        payment.setAmount(course.getPrice());
        payment.setStripePaymentIntentId("pi_mock_" + UUID.randomUUID().toString().replace("-", "").substring(0, 24));
        payment = paymentRepository.save(payment);
        
        PaymentIntentResponse response = new PaymentIntentResponse();
        response.setClientSecret(payment.getStripePaymentIntentId() + "_secret");
        response.setAmount(payment.getAmount());
        response.setCurrency("usd");
        response.setCourseId(course.getId());
        response.setCourseName(course.getTitle());
        return response;
    }

    public void handleWebhook(String payload) {
        log.info("Handled webhook: {}", payload);
    }

    public List<PaymentDto> getPaymentHistory(UUID studentId) {
        return paymentRepository.findByStudentIdOrderByCreatedAtDesc(studentId).stream()
                .map(p -> {
                    PaymentDto dto = new PaymentDto();
                    dto.setId(p.getId());
                    dto.setAmount(p.getAmount());
                    dto.setStatus(p.getStatus() != null ? p.getStatus().name() : "PENDING");
                    return dto;
                }).collect(Collectors.toList());
    }
}
