package com.spring.devforge.requests;

import java.time.LocalDateTime;

import com.spring.devforge.authentication.Users;
import com.spring.devforge.membership.Role;
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
	private Integer id;
	@ManyToOne(fetch=FetchType.LAZY) 
	private Users user;
	@ManyToOne(fetch=FetchType.LAZY) 
	private Organization org;
	@Enumerated(EnumType.STRING)
	private Role requestedRole;
	@Enumerated(EnumType.STRING)
	private Status status;
	private LocalDateTime createdAt;
	@ManyToOne(fetch=FetchType.LAZY)
	Users reviewedBy;
	LocalDateTime reviewdAt;
	public Request( Users user, Organization org,  Role requestedRole) {
		super();
		this.user = user;
		this.org = org;
		this.requestedRole = requestedRole;
		this.reviewedBy=null;
		this.reviewdAt=null;
	}

	public Role getRequestedRole() {
		return requestedRole;
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
	
	public void setRole(Role requestedRole) {
		this.requestedRole=requestedRole;
	}
	
	public void setStatus(Status status) {
		this.status=status;
	}

	
	
	public Integer getId() {
		return id;
	}
	public Users getUser() {
		return user;
	}
	public Organization getOrg() {
		return org;
	}

	public Status getStatus() {
		return status;
	}

	public void setAtReview(Users reviewedBy,Status status) {
		this.status=status;
		this.reviewedBy=reviewedBy;
		this.reviewdAt=LocalDateTime.now();
	}
	
	@PrePersist
	public void setOnCreation() {
		createdAt=LocalDateTime.now();
		this.status=Status.PENDING;
	}
	
	public Request() {}
	
	
}
