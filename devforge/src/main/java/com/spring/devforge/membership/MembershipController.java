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


import jakarta.persistence.EntityNotFoundException;

@RestController
public class MembershipController {
	
	@Autowired
	MembershipService service;
	@PostMapping("/org/{slug}/users")
	public ResponseEntity<MembershipResponse> addNewMember(@PathVariable String slug,@RequestBody MembershipRequest req) throws AccessDeniedException, AuthenticationException{
		service.handleMembershipCreation(slug, req.getUsername(),req.getRole());
		return new ResponseEntity<>(new MembershipResponse(req.getRole(),req.getUsername(),slug,"The membership was created successfully"),HttpStatus.CREATED);
	}
	
	@DeleteMapping("/org/{slug}/users/{username}")
	public ResponseEntity<MembershipResponse> deleteMember(@PathVariable String slug,@PathVariable String username) throws AccessDeniedException, EntityNotFoundException, AuthenticationException{
		service.handleMembershipDeletion(slug, username);
		return new ResponseEntity<>(new MembershipResponse(username,slug,"The membership was deleted successfully"),HttpStatus.OK);
	}
	
	@PutMapping("/org/{slug}/users/{username}")
	public ResponseEntity<MembershipResponse> updateMember(@PathVariable String slug,@PathVariable String username,@RequestBody MembershipRequest req) throws EntityNotFoundException, AccessDeniedException, AuthenticationException{
		service.handleMembershipUpdation(slug, username,req.getRole());
		return new ResponseEntity<>(new MembershipResponse(req.getRole(),username,slug,"The membership was updated successfully"),HttpStatus.OK);

		}
	

	@GetMapping("/org/{slug}/users")
	public ResponseEntity<List<GetMembersResponse>> getAllUsers(@PathVariable String slug) throws AuthenticationException{
		return new ResponseEntity<>(service.handleGetAllMembers(slug), HttpStatus.OK);	
	}
	
	@GetMapping("/org/{slug}/users/{role}")
	public ResponseEntity<List<GetMembersResponse>> getAllUsersWithRole(@PathVariable String slug,@PathVariable Role role) throws AuthenticationException{
		return new ResponseEntity<>(service.handleGetAllMembersWithRole(slug,role), HttpStatus.OK);	
	}
}
