package com.spring.devforge.authentication;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.spring.devforge.ApiResponse;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController

public class AuthController {
	
	@Autowired
	AuthService service;
	
	@Autowired
	JwtService jwt;
	
	@GetMapping("/me")
	public ResponseEntity<ApiResponse> getCurrentUser(HttpServletRequest request){
		AuthData data=service.handleVerifyToken(service.extractTokenFromCookie(request),request);
		if(data==null)return new ResponseEntity<>(new ApiResponse(false,"Invalid Session",null),HttpStatus.OK);
		return new ResponseEntity<>(new ApiResponse(true,"Session verified",data),HttpStatus.OK);

	}
	
	@PostMapping("/auth/login")
	public ResponseEntity<ApiResponse> login(@RequestBody Users u) {
		AuthData data=service.handleLogin(u);
		String token=jwt.generateJwt(data.getEmail());
		return new ResponseEntity<>(new ApiResponse(true,"Successfull Log in",data),service.getCookieHeader(token,60*60),HttpStatus.OK);
	}
	
	@PostMapping("/auth/signup")
	public ResponseEntity<ApiResponse> signup(@RequestBody Users u) {
		AuthData data=service.handleSignup(u);
		String token=jwt.generateJwt(data.getEmail());
		return new ResponseEntity<>(new ApiResponse(true,"Successfull Sign in",data),service.getCookieHeader(token,60*60),HttpStatus.OK);
	}
	
	@PostMapping("/auth/logout")
	public ResponseEntity<ApiResponse> logout(){
	    SecurityContextHolder.clearContext(); 
		return new ResponseEntity<>(new ApiResponse(true,"Logged out",null),service.getCookieHeader("", 0),HttpStatus.OK);
	}
	
	
}
