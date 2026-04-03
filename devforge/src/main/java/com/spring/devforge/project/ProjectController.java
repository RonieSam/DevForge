package com.spring.devforge.project;

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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.spring.devforge.ApiResponse;



@RestController
public class ProjectController {
	
	@Autowired
	ProjectService service;
	
	@PostMapping("/org/{slug}/projects")
	public ResponseEntity<ApiResponse> createProject(@RequestBody ProjectCreationDTO dto,@PathVariable String slug) throws AccessDeniedException, AuthenticationException{
		System.out.println(dto.getName());
		ProjectData data=service.handleProjectCreation(dto.getName(),slug);
		return new ResponseEntity<>(new ApiResponse(true,"Project has been created",data),HttpStatus.CREATED);

	}
	
	@PutMapping("/org/{slug}/projects/{id}")
	public ResponseEntity<ApiResponse> updateProject(@PathVariable String slug,@PathVariable long id,@RequestBody ProjectCreationDTO dto) throws AuthenticationException, AccessDeniedException{
		ProjectData data=service.handleProjectUpdation(id,slug,dto.getName());
		return new ResponseEntity<>(new ApiResponse(true,"Project has been updated",data),HttpStatus.OK);

	}
	
	@DeleteMapping("/org/{slug}/projects/{id}")
	public ResponseEntity<Object> deleteProject(@PathVariable String slug,@PathVariable long id) throws AuthenticationException, AccessDeniedException{
		service.handleProjectDeletion(id,slug);
		return new ResponseEntity<>(new ApiResponse(true,"Project has been deleted",null),HttpStatus.OK);

	}
	
	@GetMapping("/org/{slug}/projects")
	public ResponseEntity<ApiResponse> getProjects(@PathVariable String slug) throws AuthenticationException{
		List<ProjectData> data=service.handleGetAllProject(slug);
		return new ResponseEntity<>(new ApiResponse(true,"",data),HttpStatus.OK);
	}
	@GetMapping("projects/{id}")
	public ResponseEntity<ApiResponse> getProjects(@PathVariable long id) throws AuthenticationException, AccessDeniedException{
		ProjectData data=service.handleGetProject(id);
		return new ResponseEntity<>(new ApiResponse(true,"",data),HttpStatus.OK);
	}
}
