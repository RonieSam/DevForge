package com.spring.devforge.task;

import java.nio.file.AccessDeniedException;
import java.util.List;

import javax.naming.AuthenticationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spring.devforge.ApiResponse;
import com.spring.devforge.authentication.Users;

@RestController
public class TaskController {

	@Autowired
	TaskService service;
	@PostMapping("/projects/{id}/tasks")
	public ResponseEntity<ApiResponse> createTask(@PathVariable long id,@RequestBody TaskRequest req) throws AuthenticationException, AccessDeniedException{
		TaskData data=service.handleTaskCreation(req.getDesc(), req.getDeadline(), id, req.getAssignedTo(), req.getPriority());
		return new ResponseEntity<>(new ApiResponse(true,"Task was created",data),HttpStatus.CREATED);
	}
	
	@PutMapping("tasks/{id}")
	public ResponseEntity<ApiResponse> updateTask(@PathVariable long id,@RequestBody TaskRequest req) throws AuthenticationException, AccessDeniedException{
		TaskData data=service.handleTaskUpdation(req.getDesc(), req.getDeadline(), req.getAssignedTo(), req.getPriority(),id,req.getStatus());
		return new ResponseEntity<>(new ApiResponse(true,"Task was updated",data),HttpStatus.OK);
	}
	
	@GetMapping("projects/{id}/tasks")
	public ResponseEntity<ApiResponse> getAllTask(@PathVariable long id) throws AuthenticationException, AccessDeniedException{
		List<TaskData> data=service.handleGetAllTasks(id);
		return new ResponseEntity<>(new ApiResponse(true,"",data),HttpStatus.OK);
	}
	
				@GetMapping("/tasks/me")
				public ResponseEntity<ApiResponse> getAllOrgTask(@RequestParam(required=false) Long orgId) throws AuthenticationException, AccessDeniedException{
					List<TaskData> data=service.handleGetAllUserOrgTasks(orgId);
					return new ResponseEntity<>(new ApiResponse(true,"",data),HttpStatus.OK);
				}
	
}
