package com.spring.devforge.authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.spring.devforge.ApiResponse;

@RestController

public class AuthController {
	
	@Autowired
	AuthService service;
	
	@GetMapping("/auth/test")
	public String checkStatus() {
		return "Successful";
	}
	
	@PostMapping("/auth/login")
	public ResponseEntity<Object> login(@RequestBody Users u) {
		AuthData data=service.handleLogin(u);
		return new ResponseEntity<>(new ApiResponse(true,"Successfull Log in",data),HttpStatus.OK);
	}
	
	@PostMapping("/auth/signup")
	public ResponseEntity<Object> signup(@RequestBody Users u) {
		AuthData data=service.handleSignup(u);
		return new ResponseEntity<>(new ApiResponse(true,"Successfull Sign in",data),HttpStatus.OK);
	}
	
}
