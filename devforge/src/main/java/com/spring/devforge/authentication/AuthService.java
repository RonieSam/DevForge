package com.spring.devforge.authentication;




import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;



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
	
	
	
	@Autowired
	UserDetailsService userDetailsService;
	
	public String extractTokenFromCookie(HttpServletRequest request) {
		if(request.getCookies()!=null) {
			for(Cookie cookie:request.getCookies()) {
				if("token".equals(cookie.getName())) {
					return cookie.getValue();
				}
			}
		}
		throw new InsufficientAuthenticationException("Cookies not found");
	}
	
	public HttpHeaders getCookieHeader(String token,int age) {
		ResponseCookie cookie=ResponseCookie.from("token",token)
				.httpOnly(true)
				.maxAge(age)
				.path("/")
				.sameSite("Strict")
				.build();
		HttpHeaders headers=new HttpHeaders();
		headers.add(HttpHeaders.SET_COOKIE, cookie.toString());
		return headers;
	}
	
	public AuthData handleVerifyToken(String token,HttpServletRequest request) {
		String email=null;
		if(token!=null) {
			email=jwtService.extractEmail(token);
		}
	
		if(email!=null && SecurityContextHolder.getContext().getAuthentication()!=null) {

			UserDetails userDetails=userDetailsService.loadUserByUsername(email);
			if(jwtService.validateToken(token, userDetails)) {
				System.out.println("inside");
				Users user=repo.findByEmail(email);
			    return AuthMapper.toData(user); 
			}
		}
		return null;
	}
	public Users getUser() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if(auth==null||!auth.isAuthenticated()||auth.getName().equals("AnonymousUser"))throw new InsufficientAuthenticationException("User not Authenticated");
	    String email = auth.getName();
	    Users user = repo.findByEmail(email);
	    return user;
	}
	public AuthData handleLogin(Users u) {
		authManager.authenticate(new UsernamePasswordAuthenticationToken(u.getEmail(),u.getPassword()));
		Users user=repo.findByEmail(u.getEmail());
		return AuthMapper.toData(user);
	}
	
	public AuthData handleSignup(Users u) {
		if(repo.findByEmail(u.getEmail())!=null) throw new IllegalArgumentException("Email is already taken");
		if(repo.findByUsername(u.getUsername())!=null) throw new IllegalArgumentException("Username is already taken");
		if(u.getPassword().length()<8)throw new IllegalArgumentException("Password must be atleast 8 characters");
		u.setPassword(passwordEncoder.encode(u.getPassword()));
		repo.save(u);
		return AuthMapper.toData(u);

	}
		

	
}
