package com.spring.devforge.authentication;

public class AuthData {
	private long id;
	private String firstName;
	private String lastName;
	private String username;
	private String email;
	
	public String getFirstName() {
		return firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public String getUsername() {
		return username;
	}
	
	public String getEmail() {
		return email;
	}
	
	public long getId() {
		return id;
	}
	public AuthData(long id,String firstName,String lastName,String username,String email) {
		super();
		this.id=id;
		this.firstName=firstName;
		this.lastName=lastName;
		this.username = username;
		this.email=email;
	}
	
	
}
