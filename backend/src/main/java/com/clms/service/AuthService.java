package com.clms.service;

import com.clms.dto.request.ForgotPasswordRequest;
import com.clms.dto.request.LoginRequest;
import com.clms.dto.request.RefreshTokenRequest;
import com.clms.dto.request.RegisterRequest;
import com.clms.dto.request.ResetPasswordRequest;
import com.clms.dto.response.AuthResponse;
import com.clms.dto.response.UserDto;
import com.clms.entity.RefreshToken;
import com.clms.entity.Role;
import com.clms.entity.User;
import com.clms.exception.BadRequestException;
import com.clms.exception.ConflictException;
import com.clms.exception.UnauthorizedException;
import com.clms.repository.RefreshTokenRepository;
import com.clms.repository.RoleRepository;
import com.clms.repository.UserRepository;
import com.clms.security.CustomUserDetails;
import com.clms.security.JwtTokenProvider;
import com.clms.util.RandomTokenGenerator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;
    private final EmailService emailService;
    private final RandomTokenGenerator tokenGenerator;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new ConflictException("Email already in use");
        }

        Role.RoleName roleName = Role.RoleName.STUDENT;
        if ("INSTRUCTOR".equalsIgnoreCase(request.getRole())) {
            roleName = Role.RoleName.INSTRUCTOR;
        }
        
        Role role = roleRepository.findByName(roleName)
                .orElseThrow(() -> new RuntimeException("Role not found"));

        String emailVerifyToken = tokenGenerator.generateToken(64);

        User user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phone(request.getPhone())
                .isEmailVerified(false)
                .isActive(true)
                .build();
        
        user.getRoles().add(role);
        user = userRepository.save(user);

        // emailService.sendVerificationEmail(user, emailVerifyToken); // Assume implemented

        return generateAuthResponse(user);
    }

    @Transactional
    public AuthResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        User user = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new UnauthorizedException("User not found"));

        return generateAuthResponse(user);
    }

    @Transactional
    public AuthResponse refreshToken(RefreshTokenRequest request) {
        RefreshToken refreshToken = refreshTokenRepository.findByToken(request.getRefreshToken())
                .orElseThrow(() -> new UnauthorizedException("Invalid refresh token"));

        if (refreshToken.getIsRevoked() || refreshToken.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new UnauthorizedException("Refresh token is expired or revoked");
        }

        User user = refreshToken.getUser();
        CustomUserDetails userDetails = new CustomUserDetails(user);
        
        String newAccessToken = jwtTokenProvider.generateToken(userDetails);
        
        return AuthResponse.builder()
                .accessToken(newAccessToken)
                .refreshToken(refreshToken.getToken())
                .tokenType("Bearer")
                .expiresIn(900000) // 15 mins
                .user(mapToUserDto(user))
                .build();
    }

    @Transactional
    public void logout(String refreshTokenStr) {
        refreshTokenRepository.findByToken(refreshTokenStr).ifPresent(token -> {
            token.setIsRevoked(true);
            refreshTokenRepository.save(token);
        });
    }

    @Transactional
    public void forgotPassword(ForgotPasswordRequest request) {
        Optional<User> userOpt = userRepository.findByEmail(request.getEmail());
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            String resetToken = tokenGenerator.generateToken(64);
            // In a real app we'd add resetToken/Expiry to User entity. Assuming we just send email.
            emailService.sendPasswordResetEmail(user, resetToken);
        }
    }

    @Transactional
    public void resetPassword(ResetPasswordRequest request) {
        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            throw new BadRequestException("Passwords do not match");
        }
        // In reality, verify token. Here we assume success for brevity or throw if not matching
    }

    @Transactional
    public void verifyEmail(String token) {
        // Implement token verification logic
    }

    private AuthResponse generateAuthResponse(User user) {
        CustomUserDetails userDetails = new CustomUserDetails(user);
        String accessToken = jwtTokenProvider.generateToken(userDetails);
        String refreshTokenStr = jwtTokenProvider.generateRefreshToken(userDetails);

        RefreshToken refreshToken = RefreshToken.builder()
                .user(user)
                .token(refreshTokenStr)
                .expiresAt(LocalDateTime.now().plusDays(7))
                .isRevoked(false)
                .build();
        refreshTokenRepository.save(refreshToken);

        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshTokenStr)
                .tokenType("Bearer")
                .expiresIn(900000)
                .user(mapToUserDto(user))
                .build();
    }

    private UserDto mapToUserDto(User user) {
        return UserDto.builder()
                .id(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .avatar(user.getAvatar())
                .roles(user.getRoles().stream().map(r -> r.getName().name()).collect(Collectors.toSet()))
                .isActive(user.getIsActive())
                .isEmailVerified(user.getIsEmailVerified())
                .build();
    }
}
