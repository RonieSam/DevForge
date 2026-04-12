package com.spring.devforge.orgainzation;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.spring.devforge.ApiResponse;

import jakarta.transaction.Transactional;

@RestController
public class OrgController {

	
	@Autowired
	OrgService orgService;
	
	@PostMapping("/org")
	public ResponseEntity<ApiResponse> createOrg(@RequestBody Organization org){
		OrgData data=orgService.handleOrgCreation(org);
		return new ResponseEntity<>(new ApiResponse(true,"Organization has been successfully created",data),HttpStatus.CREATED);

	}
	
	@PutMapping("/org/{slug}")
	public ResponseEntity<ApiResponse> updateOrg(@RequestBody UpdateOrgRequest req,@PathVariable String slug) throws AccessDeniedException, AuthenticationException{
		OrgData data=orgService.handleUpdateOrg(slug,req.getName());
		return new ResponseEntity<>(new ApiResponse(true,"Organization has been successfully updated",data),HttpStatus.OK);

	}
	
	@DeleteMapping("/org/{slug}")
	public ResponseEntity<ApiResponse> deleteOrg(@PathVariable String slug) throws AuthenticationException, AccessDeniedException{
		orgService.handleDeleteOrg(slug);
		return new ResponseEntity<>(new ApiResponse(true,"Organization has been successfully deleted",null),HttpStatus.OK);
	}
	
	@GetMapping("/org")
	public ResponseEntity<ApiResponse> getAllOrg(){
		List<UserOrgData> data=orgService.handleGetAllOrg();
		return new ResponseEntity<>(new ApiResponse(true,"",data),HttpStatus.OK);
	}
	
	@GetMapping("/org/search")
	public ResponseEntity<ApiResponse> getOrgPrefix(@RequestParam String pre){
		List<OrgData> data=orgService.handleGetOrgPrefix(pre);
		return new ResponseEntity<>(new ApiResponse(true,"",data),HttpStatus.OK);
	}
}	
