package com.spring.devforge.logs;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.spring.devforge.authentication.Users;
import com.spring.devforge.project.Project;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;

@Entity
public class ProjectLogs {
	@Id @GeneratedValue
	long id;
	String action;
	LocalDateTime createdAt;
	
	@ManyToOne(fetch=FetchType.LAZY)
	Users actionBy;
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JsonIgnore
	Project proj;

	public ProjectLogs(String action, Users actionBy, Project proj) {
		super();
		this.action = action;
		this.actionBy = actionBy;
		this.proj = proj;
	}
	
	public ProjectLogs() {}

	public long getId() {
		return id;
	}

	public String getAction() {
		return action;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public Users getActionBy() {
		return actionBy;
	}

	public Project getProj() {
		return proj;
	}
	
	@PrePersist
	void atCreation() {
		this.createdAt=LocalDateTime.now();
	}
	
	
	
	
}
