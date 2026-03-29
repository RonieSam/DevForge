package com.spring.devforge.requests;

import java.nio.file.AccessDeniedException;
import java.util.List;

import javax.naming.AuthenticationException;

import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.spring.devforge.membership.Role;

@RestController
public class RequestController {
	
	@Autowired
	RequestService service;
	
//	public RequestResponse(int id, String slug, Role role, Status status, String msg) {

	@PostMapping("/org/{slug}/request")
	public ResponseEntity<RequestResponse> createRequest(@PathVariable String slug,@RequestBody RequestCreationDto r ) throws AccessDeniedException{
		Request req=service.handleRequestCreation(slug, r.getRole());
		return new ResponseEntity<>(new RequestResponse(req.getId(),req.getUser().getUsername(),req.getOrg().getSlug(),req.getRequestedRole(),req.getStatus(),"Request has been sent"),HttpStatus.CREATED);
	}
	
	@GetMapping("/org/{slug}/request")
	public ResponseEntity<Object> createRequest(@PathVariable String slug ) throws AuthenticationException {
		List<GetRequestResponse> reqs=service.handleGetAllRequests(slug);
		return new ResponseEntity<>(reqs,HttpStatus.OK);
	}
	
	@PostMapping("/org/{slug}/request/{id}")
	public ResponseEntity<RequestResponse> createRequest(@PathVariable String slug,@PathVariable int id,@RequestBody RequestReviewDto r ) throws AuthenticationException, AccessDeniedException, BadRequestException {
		Request req=service.handleReviewRequest(id, r.getStatus());
		return new ResponseEntity<>(new RequestResponse(req.getId(),req.getUser().getUsername(),req.getOrg().getSlug(),req.getRequestedRole(),req.getStatus(),"Request has been reviewed"),HttpStatus.CREATED);
	}
}
