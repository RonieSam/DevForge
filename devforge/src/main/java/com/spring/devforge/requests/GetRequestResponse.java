package com.spring.devforge.requests;

import java.time.LocalDateTime;

import com.spring.devforge.membership.Role;

public class GetRequestResponse {
	int id;
	String username;
	Status status;
	LocalDateTime requestedAt;
	Role role;
	String reviewedBy;
	LocalDateTime reviewAt;
	public String getUsername() {
		return username;
	}
	public Status getStatus() {
		return status;
	}
	public LocalDateTime getRequestedAt() {
		return requestedAt;
	}
	public Role getRole() {
		return role;
	}
	public String getReviewedBy() {
		return reviewedBy;
	}
	public LocalDateTime getReviewAt() {
		return reviewAt;
	}
	public int getId() {
		return id;
	}
	public GetRequestResponse(int id,String username, Status status, LocalDateTime requestedAt, Role role, String reviewedBy,
			LocalDateTime reviewAt) {
		super();
		this.id=id;
		this.username = username;
		this.status = status;
		this.requestedAt = requestedAt;
		this.role = role;
		this.reviewedBy = reviewedBy;
		this.reviewAt = reviewAt;
	}
	public GetRequestResponse(int id,String username, Status status, LocalDateTime requestedAt, Role role) {
		super();
		this.id=id;
		this.username = username;
		this.status = status;
		this.requestedAt = requestedAt;
		this.role = role;
		this.reviewedBy = null;
		this.reviewAt = null;
	}
	
	public GetRequestResponse() {}
	
}
