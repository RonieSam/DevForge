package com.spring.devforge.task;

import java.time.LocalDateTime;
import java.util.List;

import com.spring.devforge.authentication.Users;
import com.spring.devforge.comment.Comments;
import com.spring.devforge.project.Project;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.validation.constraints.NotEmpty;


@Entity
public class Tasks {
	@Id @GeneratedValue
	Long id;
	@NotEmpty
	String description;
	LocalDateTime deadline;
	@ManyToOne(fetch=FetchType.LAZY)
	Project project;
	@ManyToOne(fetch=FetchType.LAZY)
	Users assignedTo;
	@ManyToOne(fetch=FetchType.LAZY)
	Users createdBy;
	
	@Enumerated(EnumType.STRING)
	Priority priority;
	LocalDateTime createdAt;
	@Enumerated(EnumType.STRING)
	TaskStatus status;
	LocalDateTime updatedAt;
	@OneToMany(mappedBy="task",cascade=CascadeType.ALL,orphanRemoval=true,fetch=FetchType.LAZY)
	List<Comments> comments;
	public Long getId() {
		return id;
	}
	
	Tasks(){}


	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public LocalDateTime getDeadline() {
		return deadline;
	}

	public void setDeadline(LocalDateTime deadline) {
		this.deadline = deadline;
	}

	public Project getProject() {
		return project;
	}

	public void setProject(Project project) {
		this.project = project;
	}

	public Users getAssignedTo() {
		return assignedTo;
	}

	public void setAssignedTo(Users assignedTo) {
		this.assignedTo = assignedTo;
	}

	public Users getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(Users createdBy) {
		this.createdBy = createdBy;
	}

	public Priority getPriority() {
		return priority;
	}

	public void setPriority(Priority priority) {
		this.priority = priority;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public TaskStatus getStatus() {
		return status;
	}

	public void setStatus(TaskStatus status) {
		this.status = status;
	}

	public LocalDateTime getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(LocalDateTime updatedAt) {
		this.updatedAt = updatedAt;
	}

	public Tasks(@NotEmpty String description, LocalDateTime deadline, Project project, Users assignedTo, Users createdBy,
			Priority priority) {
		super();
		this.description = description;
		this.deadline = deadline;
		this.project = project;
		this.assignedTo = assignedTo;
		this.createdBy = createdBy;
		this.priority = priority;
	}
	
	@PrePersist
	public void atCreation() {
		this.createdAt=LocalDateTime.now();
		this.status=TaskStatus.INPROGRESS;
	}
	
	
}
