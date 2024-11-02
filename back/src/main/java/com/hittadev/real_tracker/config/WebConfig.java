package com.hittadev.real_tracker.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Allow all paths
                .allowedOrigins("http://localhost:5173") // Allow your front-end app
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Allow necessary methods
                .allowCredentials(true); // Allow credentials if needed
        System.out.println("Web Config added");
    }
}
