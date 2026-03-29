package com.spring.devforge.authentication;

import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;



@Service
public class JwtService{
	
	@Value("${jwt.key}")
	private String str;
	
	private SecretKey key;
	@PostConstruct
	void init() {
		key=Keys.hmacShaKeyFor(str.getBytes());
		
	}
	
	public String generateJwt(String email) {
		
		return Jwts.builder()
				.subject(email)
				.signWith(key)
				.issuedAt(new Date())
				.expiration(new Date(System.currentTimeMillis()+60*1000*60))
				.compact();
	}
	
	public String extractEmail(String token) {
		return Jwts.parser()
				.verifyWith(key)
				.build()
				.parseSignedClaims(token)
				.getPayload()
				.getSubject();
	}
	
	public boolean validateToken(String token,UserDetails userDetails) {
		String email=extractEmail(token);
		if(email.equals(userDetails.getUsername())&&!isTokenExpired(token)) {
			return true;
		}
		return false;
		
	}
	
	public boolean isTokenExpired(String token) {
		Date ex= Jwts.parser().verifyWith(key).build().parseSignedClaims(token).getPayload().getExpiration();
		return new Date().after(ex);
		
	}

}



