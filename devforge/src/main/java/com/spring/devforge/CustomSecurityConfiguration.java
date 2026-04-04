package com.spring.devforge;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import com.spring.devforge.authentication.JwtAuthFilter;




@Configuration
public class CustomSecurityConfiguration {

	@Autowired
	JwtAuthFilter jwtAuthFilter;
	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) {
		return http
				.authorizeHttpRequests(auth->{
					auth.requestMatchers("/auth/**","/h2-console/**").permitAll();
					auth.anyRequest().authenticated();
				})
				.csrf(csrf -> csrf.disable())
				.headers(headers -> headers.frameOptions(frame -> frame.disable()))
				.sessionManagement(session->session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
				.cors(cors->cors.configurationSource(request->{
					var config=new CorsConfiguration();
					config.setAllowedOrigins(List.of("http://localhost:3000"));
					config.setAllowedMethods(List.of("*"));
					config.setAllowedHeaders(List.of("*"));
					return config;
				}))
				.build();
		
	}
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
		return config.getAuthenticationManager();
	}
}
