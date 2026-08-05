package com.clms.util;

import com.clms.exception.UnauthorizedException;
import com.clms.security.CustomUserDetails;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import java.util.UUID;

public class SecurityUtils {
    private SecurityUtils() {}
    
    public static CustomUserDetails getCurrentUserDetails() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getPrincipal() instanceof CustomUserDetails) {
            return (CustomUserDetails) auth.getPrincipal();
        }
        throw new UnauthorizedException("Not authenticated");
    }
    
    public static UUID getCurrentUserId() { return getCurrentUserDetails().getId(); }
    public static String getCurrentUserEmail() { return getCurrentUserDetails().getEmail(); }
    
    public static boolean hasRole(String role) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null) return false;
        return auth.getAuthorities().stream()
            .map(GrantedAuthority::getAuthority)
            .anyMatch(a -> a.equals("ROLE_" + role));
    }
}
