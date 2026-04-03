package com.spring.devforge.requests;

import java.time.LocalDateTime;

import com.spring.devforge.membership.Role;

public class RequestData {
	long id;
	String username;
	RequestStatus status;
	LocalDateTime requestedAt;
	Role role;
	String reviewedBy;
	LocalDateTime reviewedAt;
	public String getUsername() {
		return username;
	}
	public RequestStatus getStatus() {
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
		return reviewedAt;
	}
	public long getId() {
		return id;
	}
	public RequestData(long id,String username, RequestStatus status, LocalDateTime requestedAt, Role role, String reviewedBy,
			LocalDateTime reviewAt) {
		super();
		this.id=id;
		this.username = username;
		this.status = status;
		this.requestedAt = requestedAt;
		this.role = role;
		this.reviewedBy = reviewedBy;
		this.reviewedAt = reviewAt;
	}
	
	
	
}
