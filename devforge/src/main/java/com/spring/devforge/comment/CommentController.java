package com.spring.devforge.comment;

import java.nio.file.AccessDeniedException;
import java.util.List;

import javax.naming.AuthenticationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.spring.devforge.ApiResponse;


@RestController
public class CommentController {
	
	@Autowired
	CommentService service;
	@PostMapping("/tasks/{id}/comments")
	public ResponseEntity<ApiResponse> createComment(@PathVariable int id,@RequestBody CommentDto req) throws AuthenticationException, AccessDeniedException{
		CommentData data=service.handleAddComment(id, req.content);
		return new ResponseEntity<>(new ApiResponse(true,"Comment created",data),HttpStatus.CREATED);
		
	}
	
	@DeleteMapping("/tasks/{taskId}/comments/{id}")
	public ResponseEntity<ApiResponse> deleteComment(@PathVariable long id,@PathVariable int taskId) throws AuthenticationException, AccessDeniedException{
		service.handleDeleteComments(taskId,id);
		return new ResponseEntity<>(new ApiResponse(true,"Comment deleted",null),HttpStatus.OK);
		
	}
	
	@GetMapping("/tasks/{taskId}")
	public ResponseEntity<ApiResponse> getComments(@PathVariable int id) throws AuthenticationException{
		List<CommentData> data=service.handleGetAllComments(id);
		return new ResponseEntity<>(new ApiResponse(true,"",data),HttpStatus.OK);
	}
}
