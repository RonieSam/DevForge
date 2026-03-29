package com.spring.devforge.membership;

public class MembershipResponse {
	private Role role;
	private String username;
	private String slug;
	private String msg;
	public Role getRole() {
		return role;
	}
	public String getUsername() {
		return username;
	}
	public String getSlug() {
		return slug;
	}
	public String getMsg() {
		return msg;
	}
	public MembershipResponse(Role role, String username, String slug, String msg) {
		super();
		this.role = role;
		this.username = username;
		this.slug = slug;
		this.msg = msg;
	}
	public MembershipResponse(String username, String slug, String msg) {
		super();
		this.username = username;
		this.slug = slug;
		this.msg = msg;
	}
	
	
	
}
