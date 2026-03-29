package com.spring.devforge.requests;

import com.spring.devforge.membership.Role;

public class RequestResponse {
	int id;
	String slug;
	String username;
	Role role;
	Status status;
	String msg;
	public RequestResponse(int id, String username,String slug, Role role, Status status, String msg) {
		super();
		this.id = id;
		this.username=username;
		this.slug = slug;
		this.role = role;
		this.status = status;
		this.msg = msg;
	}
	public int getId() {
		return id;
	}
	public String getSlug() {
		return slug;
	}
	public Role getRole() {
		return role;
	}
	public Status getStatus() {
		return status;
	}
	public String getMsg() {
		return msg;
	}
	
}
