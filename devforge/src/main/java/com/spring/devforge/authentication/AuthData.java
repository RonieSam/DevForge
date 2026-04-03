package com.spring.devforge.authentication;

public class AuthData {
	private long id;
	private String username;
	private String token;
	public String getUsername() {
		return username;
	}
	public String getToken() {
		return token;
	}
	
	public long getId() {
		return id;
	}
	public AuthData(long id,String username, String token) {
		super();
		this.id=id;
		this.username = username;
		this.token = token;
	}
	
	
}
