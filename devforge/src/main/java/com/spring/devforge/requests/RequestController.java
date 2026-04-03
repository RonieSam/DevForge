package com.spring.devforge.requests;

import java.nio.file.AccessDeniedException;
import java.util.List;

import javax.naming.AuthenticationException;

import org.apache.coyote.BadRequestException;
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
import com.spring.devforge.membership.Role;

@RestController
public class RequestController {
	
	@Autowired
	RequestService service;
	

	@PostMapping("/org/{slug}/request")
	public ResponseEntity<ApiResponse> createRequest(@PathVariable String slug,@RequestBody RequestCreationDto r ) throws AccessDeniedException{
		RequestData data=service.handleRequestCreation(slug, r.getRole());
		return new ResponseEntity<>(new ApiResponse(true,"Request has been sent",data),HttpStatus.CREATED);
	}
	
	@GetMapping("/org/{slug}/request")
	public ResponseEntity<ApiResponse> getAllRequest(@PathVariable String slug ) throws AuthenticationException {
		List<RequestData> data=service.handleGetAllRequests(slug);
		return new ResponseEntity<>(new ApiResponse(true,"",data),HttpStatus.OK);
	}
	
	@PostMapping("/org/{slug}/request/{id}")
	public ResponseEntity<ApiResponse> reviewRequest(@PathVariable String slug,@PathVariable long id,@RequestBody RequestReviewDto r ) throws AuthenticationException, AccessDeniedException, BadRequestException {
		RequestData data=service.handleReviewRequest(id, r.getStatus(),slug);
		return new ResponseEntity<>(new ApiResponse(true,"Request has been reviewed",data),HttpStatus.OK);
	}
	@DeleteMapping("/org/{slug}/request/{id}")
	public ResponseEntity<ApiResponse> deleteRequest(@PathVariable String slug,@PathVariable long id,@RequestBody RequestReviewDto r ) throws AuthenticationException, AccessDeniedException, BadRequestException {
		service.handleDeleteRequest(id,slug);
		return new ResponseEntity<>(new ApiResponse(true,"Request has been deleted",null),HttpStatus.OK);
	}
}
