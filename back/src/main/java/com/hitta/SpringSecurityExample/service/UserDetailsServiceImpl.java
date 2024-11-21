package com.hitta.SpringSecurityExample.service;

import com.hitta.SpringSecurityExample.model.UserPrincipal;
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
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Users user = userRepo.findByUsername(username);

        if(user == null){
            System.out.println("User "+ username +" not found");
            throw new UsernameNotFoundException("User not found");
        }

        return new UserPrincipal(user);
    }

}
