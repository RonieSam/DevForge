package com.spring.devforge.requests;

import java.time.LocalDateTime;


public class RequestData {
	long id;
	String username;
	RequestStatus status;
	LocalDateTime requestedAt;
	String reviewedBy;
	LocalDateTime reviewedAt;
	String msg;
	public String getUsername() {
		return username;
	}
	public String getMsg() {
		return msg;
	}
	public RequestStatus getStatus() {
		return status;
	}
	public LocalDateTime getRequestedAt() {
		return requestedAt;
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
	public RequestData(long id,String username, RequestStatus status, LocalDateTime requestedAt, String reviewedBy,
			LocalDateTime reviewAt,String msg) {
		super();
		this.id=id;
		this.username = username;
		this.status = status;
		this.requestedAt = requestedAt;
		this.reviewedBy = reviewedBy;
		this.reviewedAt = reviewAt;
		this.msg=msg;
	}
	
	
	
}
