package com.clms.dto.request;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class RegisterRequest {
    @NotBlank @Size(min=2, max=100) private String firstName;
    @NotBlank @Size(min=2, max=100) private String lastName;
    @NotBlank @Email private String email;
    @NotBlank @Size(min=8, max=100) private String password;
    private String phone;
    private String role = "STUDENT";
}
