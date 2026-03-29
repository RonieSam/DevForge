package com.spring.devforge.membership;

public class GetMembersResponse {
	String username;
	String email;
	Role role;
	public GetMembersResponse(String username, String email, Role role) {
		super();
		this.username = username;
		this.email = email;
		this.role = role;
	}
	public String getUsername() {
		return username;
	}
	public String getEmail() {
		return email;
	}
	public Role getRole() {
		return role;
	}
	
}
