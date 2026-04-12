package com.spring.devforge.task;

//import java.time.LocalDateTime;
//
//public TaskData(String desc, String assignedTo, String assignedBy, TaskStatus status, Priority priority,
//		LocalDateTime deadline,LocalDateTime createdAt) {
public class TaskMapper {
	
	public static TaskData toData(Tasks task) {
		return new TaskData(
				task.getId(),
				task.getDescription(),task.getAssignedTo().getUsername(),
				task.getCreatedBy().getUsername(),
				task.getStatus(),
				task.getPriority(),
				task.getDeadline(),
				task.getCreatedAt(),
				task.getProject().getOrg().getName()
				);
	}
}
