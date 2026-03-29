package com.spring.devforge.orgainzation;

import java.nio.file.AccessDeniedException;

import javax.naming.AuthenticationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import jakarta.transaction.Transactional;

@RestController
public class OrgController {

	
	@Autowired
	OrgService orgService;
	
	@PostMapping("/org")
	public ResponseEntity<OrgResponse> createOrg(@RequestBody Organization org){
		String slug=orgService.handleOrgCreation(org);
		return new ResponseEntity<>(new OrgResponse(slug,"Organization has been successfully created"),HttpStatus.CREATED);

	}
	
	@PutMapping("/org/{slug}")
	public ResponseEntity<OrgResponse> updateOrg(@RequestBody UpdateOrgRequest req,@PathVariable String slug) throws AccessDeniedException, AuthenticationException{
		String newSlug= orgService.handleUpdateOrg(slug, req.getName());
		return new ResponseEntity<>(new OrgResponse(newSlug,"Organization has been successfully updated"),HttpStatus.OK);

	}
	
	@DeleteMapping("/org/{slug}")
	public ResponseEntity<OrgResponse> updateOrg(@PathVariable String slug) throws AuthenticationException, AccessDeniedException{
		orgService.handleDeleteOrg(slug);
		return new ResponseEntity<>(new OrgResponse(slug,"Organization has been successfully delted"),HttpStatus.OK);

	}
}
