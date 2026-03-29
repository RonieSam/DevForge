package com.spring.devforge.authentication;




import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
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
	
	
	
	

	public ResponseEntity<Object> handleLogin(Users u) {
		authManager.authenticate(new UsernamePasswordAuthenticationToken(u.getEmail(),u.getPassword()));
		return new ResponseEntity<>(new AuthResponse("Successfully Logged in",jwtService.generateJwt(u.getEmail())),HttpStatus.OK);
	}
	
	public ResponseEntity<Object> handleSignup(Users u) {
		if(repo.findByEmail(u.getEmail())!=null) return new ResponseEntity<>(new AuthResponse("Email already exisits"),HttpStatus.CONFLICT);
		if(repo.findByUsername(u.getUsername())!=null) return new ResponseEntity<>(new AuthResponse("Username already exisits"),HttpStatus.CONFLICT);
		if(u.getPassword().length()<8)throw new IllegalArgumentException("Password must be atleast 8 characters");
		u.setPassword(passwordEncoder.encode(u.getPassword()));
		repo.save(u);
		return new ResponseEntity<>(new AuthResponse("Successfully Resgistered",jwtService.generateJwt(u.getEmail())),HttpStatus.CREATED);
	}
		

	
}
