package com.spring.devforge.authentication;




import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;



@Service
public class AuthService {
	
	

	@Autowired
	UserDataJpa repo;
	
	@Autowired
	AuthenticationManager authManager;
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	@Autowired
	JwtService jwtService;
	
	
	
	public Users getUser() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
	    String email = auth.getName();
	    Users user = repo.findByEmail(email);
	    return user;
	}
	public AuthData handleLogin(Users u) {
		authManager.authenticate(new UsernamePasswordAuthenticationToken(u.getEmail(),u.getPassword()));
		Users user=repo.findByEmail(u.getEmail());
		return new AuthData(user.getId(),user.getUsername(),jwtService.generateJwt(user.getEmail()));
	}
	
	public AuthData handleSignup(Users u) {
		if(repo.findByEmail(u.getEmail())!=null) throw new IllegalArgumentException("Email is already taken");
		if(repo.findByUsername(u.getUsername())!=null) throw new IllegalArgumentException("Username is already taken");
		if(u.getPassword().length()<8)throw new IllegalArgumentException("Password must be atleast 8 characters");
		u.setPassword(passwordEncoder.encode(u.getPassword()));
		repo.save(u);
		return new AuthData(u.getId(),u.getUsername(),jwtService.generateJwt(u.getEmail()));

	}
		

	
}
