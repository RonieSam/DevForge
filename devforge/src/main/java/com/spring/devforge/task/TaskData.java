package com.spring.devforge.task;

import java.time.LocalDateTime;

public class TaskData {
	long id;
	String desc;
	String assignedTo;
	String assignedBy;
	TaskStatus status;
	Priority priority;
	LocalDateTime deadline;
	LocalDateTime createdAt;
	public TaskData(long id,String desc, String assignedTo, String assignedBy, TaskStatus status, Priority priority,
			LocalDateTime deadline,LocalDateTime createdAt) {
		super();
		this.id=id;
		this.desc = desc;
		this.assignedTo = assignedTo;
		this.assignedBy = assignedBy;
		this.status = status;
		this.priority = priority;
		this.deadline = deadline;
		this.createdAt=createdAt;
	}
	
	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public String getDesc() {
		return desc;
	}
	public String getAssignedTo() {
		return assignedTo;
	}
	public String getAssignedBy() {
		return assignedBy;
	}
	public TaskStatus getStatus() {
		return status;
	}
	public Priority getPriority() {
		return priority;
	}
	public LocalDateTime getDeadline() {
		return deadline;
	}
	public long getId() {
		return id;
	}
	
	
}
