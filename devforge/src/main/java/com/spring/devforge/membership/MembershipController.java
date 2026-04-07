package com.spring.devforge.membership;

import java.nio.file.AccessDeniedException;
import java.util.ArrayList;
import java.util.List;

import javax.naming.AuthenticationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.spring.devforge.ApiResponse;

import jakarta.persistence.EntityNotFoundException;

@RestController
public class MembershipController {
	
	@Autowired
	MembershipService service;
	@PostMapping("/org/{slug}/users")
	public ResponseEntity<ApiResponse> addNewMember(@PathVariable String slug,@RequestBody MembershipRequest req) throws AccessDeniedException, AuthenticationException{
		MembershipData data=service.handleMembershipCreation(slug, req.getUsername(),req.getRole());
		return new ResponseEntity<>(new ApiResponse(true,"New member is added to organization",data),HttpStatus.CREATED);
	}
	
	@DeleteMapping("/org/{slug}/users/{username}")
	public ResponseEntity<ApiResponse> deleteMember(@PathVariable String slug,@PathVariable String username) throws AccessDeniedException, EntityNotFoundException, AuthenticationException{
		service.handleMembershipDeletion(slug, username);
		return new ResponseEntity<>(new ApiResponse(true,"Member is removed from organization",null),HttpStatus.OK);
	}
	
	@PutMapping("/org/{slug}/users/{username}")
	public ResponseEntity<ApiResponse> updateMember(@PathVariable String slug,@PathVariable String username,@RequestBody MembershipRequest req) throws EntityNotFoundException, AccessDeniedException, AuthenticationException{
		MembershipData data=service.handleMembershipUpdation(slug, username,req.getRole());
		return new ResponseEntity<>(new ApiResponse(true,"Membership has been updated",data),HttpStatus.OK);

		}
	

	@GetMapping("/org/{slug}/users")
	public ResponseEntity<ApiResponse> getAllUsers(@PathVariable String slug) throws AuthenticationException{
		List<MembershipData> data=service.handleGetAllMembers(slug);
		return new ResponseEntity<>(new ApiResponse(true,"",data),HttpStatus.OK);
	}
	
	@GetMapping("/org/{slug}/me")
	public ResponseEntity<ApiResponse> isMember(@PathVariable String slug) throws AuthenticationException{
		MembershipData data=service.isMember(slug);
		if(data==null)return new ResponseEntity<>(new ApiResponse(false,"",data),HttpStatus.OK);
		return new ResponseEntity<>(new ApiResponse(true,"",data),HttpStatus.OK);
	}
}
