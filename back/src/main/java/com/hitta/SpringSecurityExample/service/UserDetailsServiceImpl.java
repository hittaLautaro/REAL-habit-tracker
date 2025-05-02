package com.hitta.SpringSecurityExample.service;

import com.hitta.SpringSecurityExample.dtos.UserAuthResponse;
import com.hitta.SpringSecurityExample.model.CustomUserDetails;
import com.hitta.SpringSecurityExample.model.Users;
import com.hitta.SpringSecurityExample.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepo userRepo;


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        UserAuthResponse user = userRepo.findUserAuthByEmail(email).orElseThrow(() -> new UsernameNotFoundException("Username not found."));
        if(user == null){
            System.out.println("User "+ email +" not found");
            throw new UsernameNotFoundException("User not found");
        }

        return new CustomUserDetails(
                user.getEmail(),
                user.getPassword(),
                user.isEnabled(),
                user.isAccountLocked()
        );
    }

}
