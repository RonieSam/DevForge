package com.spring.devforge.requests;

import java.time.LocalDateTime;

import com.spring.devforge.authentication.Users;
import com.spring.devforge.orgainzation.Organization;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.validation.constraints.NotNull;


@Entity
public class Request {
	@Id @GeneratedValue
	private Long id;
	@ManyToOne(fetch=FetchType.LAZY) 
	private Users user;
	@ManyToOne(fetch=FetchType.LAZY) 
	private Organization org;
	String msg;
	@Enumerated(EnumType.STRING)
	private RequestStatus status;
	private LocalDateTime createdAt;
	@ManyToOne(fetch=FetchType.LAZY)
	Users reviewedBy;
	LocalDateTime reviewdAt;
	public Request( Users user, Organization org,String msg) {
		super();
		this.user = user;
		this.org = org;
		this.reviewedBy=null;
		this.reviewdAt=null;
		this.msg=msg;
	}

		
	public String getMsg() {
		return msg;
	}
	
	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public Users getReviewedBy() {
		return reviewedBy;
	}

	public LocalDateTime getReviewdAt() {
		return reviewdAt;
	}
	
	
	public void setStatus(RequestStatus status) {
		this.status=status;
	}

	
	
	public Long getId() {
		return id;
	}
	public Users getUser() {
		return user;
	}
	public Organization getOrg() {
		return org;
	}

	public RequestStatus getStatus() {
		return status;
	}

	public void setAtReview(Users reviewedBy,RequestStatus status) {
		this.status=status;
		this.reviewedBy=reviewedBy;
		this.reviewdAt=LocalDateTime.now();
	}
	
	@PrePersist
	public void setOnCreation() {
		createdAt=LocalDateTime.now();
		this.status=RequestStatus.PENDING;
	}
	
	public Request() {}
	
	
}
