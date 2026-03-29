package com.spring.devforge.membership;

public class MembershipRequest {
	String username;
	Role role;
	public String getUsername() {
		return username;
	}
	
	
	public Role getRole() {
		return role;
	}
	public MembershipRequest(String username,Role role) {
		super();
		this.username = username;
		this.role=role;
	}
	public MembershipRequest(Role role) {
		super();
		this.username = null;
		this.role=role;
	}
	
	public MembershipRequest() {}
	
}
