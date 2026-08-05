package com.clms.service;

import com.clms.dto.request.UpdateProfileRequest;
import com.clms.dto.response.PageResponse;
import com.clms.dto.response.UserDto;
import com.clms.entity.Role;
import com.clms.entity.User;
import com.clms.exception.BadRequestException;
import com.clms.exception.ResourceNotFoundException;
import com.clms.repository.RoleRepository;
import com.clms.repository.UserRepository;
import com.clms.util.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final FileStorageService fileStorageService;

    @Transactional
    public String uploadAvatar(org.springframework.web.multipart.MultipartFile file, UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        String filename = fileStorageService.storeFile(file, "avatars");
        String fileUrl = fileStorageService.getFileUrl("avatars", filename);
        user.setAvatar(fileUrl);
        userRepository.save(user);
        return fileUrl;
    }

    @Transactional(readOnly = true)
    public UserDto getCurrentUser() {
        UUID userId = SecurityUtils.getCurrentUserId();
        return getUserById(userId);
    }

    @Transactional(readOnly = true)
    public UserDto getUserById(UUID id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        return mapToUserDto(user);
    }

    @Transactional
    public UserDto updateProfile(UpdateProfileRequest request, UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        
        if (request.getFirstName() != null) user.setFirstName(request.getFirstName());
        if (request.getLastName() != null) user.setLastName(request.getLastName());
        if (request.getPhone() != null) user.setPhone(request.getPhone());
        if (request.getAvatar() != null) user.setAvatar(request.getAvatar());
        
        return mapToUserDto(userRepository.save(user));
    }

    @Transactional(readOnly = true)
    public PageResponse<UserDto> getAllUsers(Pageable pageable) {
        Page<User> page = userRepository.findAll(pageable);
        return PageResponse.of(page.map(this::mapToUserDto));
    }

    @Transactional
    public void updateUserRole(UUID id, String roleNameStr) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        if (roleNameStr != null) {
            try {
                Role.RoleName roleName = Role.RoleName.valueOf(roleNameStr.toUpperCase());
                Role role = roleRepository.findByName(roleName)
                        .orElseThrow(() -> new ResourceNotFoundException("Role", "name", roleNameStr));
                user.getRoles().clear();
                user.getRoles().add(role);
                userRepository.save(user);
            } catch (IllegalArgumentException e) {
                throw new BadRequestException("Invalid role name: " + roleNameStr);
            }
        }
    }

    @Transactional
    public void deleteUser(UUID id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
        userRepository.delete(user);
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
