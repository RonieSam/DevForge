package com.spring.devforge.membership;

import java.time.LocalDateTime;

public class MembershipData {
	long id;
	String username;
	Role role;
	String slug;
	public MembershipData(long id,String username, Role role,String slug) {
		super();
		this.id=id;
		this.username = username;
		this.role = role;
		this.slug=slug;
	}
	public String getUsername() {
		return username;
	}
	
	public Role getRole() {
		return role;
	}
	public String getSlug() {
		return slug;
	}
	public long getId() {
		return id;
	}
	
	
}
