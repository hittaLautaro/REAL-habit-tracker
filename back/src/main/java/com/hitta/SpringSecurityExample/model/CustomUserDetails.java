package com.hitta.SpringSecurityExample.model;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public class CustomUserDetails implements UserDetails {

    private final String email;
    private final String password;
    private final boolean enabled;
    private final boolean accountLocked;
    private final List<GrantedAuthority> authorities;

    // Constructor to initialize CustomUserDetails with necessary fields from Users entity
    public CustomUserDetails(String email, String password, boolean enabled, boolean accountLocked) {
        this.email = email;
        this.password = password;
        this.enabled = enabled;
        this.accountLocked = accountLocked;
        this.authorities = List.of(new SimpleGrantedAuthority("USER"));  // You can add roles/authorities if needed
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;  // List of roles/authorities (in your case, "USER")
    }

    @Override
    public String getPassword() {
        return password;  // User's password
    }

    @Override
    public String getUsername() {
        return email;  // Email as username
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;  // You can implement expiration logic if needed
    }

    @Override
    public boolean isAccountNonLocked() {
        return !accountLocked;  // Account is locked if the accountLocked field is true
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;  // You can implement expiration logic for credentials if needed
    }

    @Override
    public boolean isEnabled() {
        return enabled;  // User is enabled if the enabled field is true
    }

    public String getEmail() {
        return email;
    }
}
