package com.spring.devforge.requests;

import com.spring.devforge.membership.Role;

import jakarta.validation.constraints.NotNull;

public class RequestCreationDto {
	
	Role role;
	public RequestCreationDto(Role role) {
		super();
		this.role = role;
	}
	
	public Role getRole() {
		return role;
	}
	
	
	
}
