package com.spring.devforge.authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {
	
	@Autowired
	AuthService service;
	
	@GetMapping("/auth/test")
	public String checkStatus() {
		return "Successful";
	}
	
	@GetMapping("/auth")
	public ResponseEntity<Object> login(@RequestBody Users u) {
		return service.handleLogin(u);
	}
	
	@PostMapping("/auth")
	public ResponseEntity<Object> signup(@RequestBody Users u) {
		return service.handleSignup(u);
	}
	
}
