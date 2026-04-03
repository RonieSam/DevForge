package com.spring.devforge.task;

import java.time.LocalDateTime;

public class TaskRequest {
	String desc;
	LocalDateTime deadline;
	String assignedTo;
	Priority priority;
	TaskStatus status;
	public TaskRequest(String desc, LocalDateTime deadline, String assignedTo, Priority priority,TaskStatus status) {
		super(); 
		this.desc = desc;
		this.deadline = deadline;
		this.assignedTo = assignedTo;
		this.priority = priority;
		this.status=status;
	}
	
	public TaskStatus getStatus() {
		return status;
	}
	public String getDesc() {
		return desc;
	}
	public LocalDateTime getDeadline() {
		return deadline;
	}
	public String getAssignedTo() {
		return assignedTo;
	}
	public Priority getPriority() {
		return priority;
	}
	
}
