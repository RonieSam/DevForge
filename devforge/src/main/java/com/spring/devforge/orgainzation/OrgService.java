package com.spring.devforge.orgainzation;

import java.nio.file.AccessDeniedException;

import javax.naming.AuthenticationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.spring.devforge.authentication.UserDataJpa;
import com.spring.devforge.authentication.Users;
import com.spring.devforge.membership.Membership;
import com.spring.devforge.membership.MembershipDataJpa;
import com.spring.devforge.membership.MembershipService;
import com.spring.devforge.membership.Role;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
public class OrgService {
	
	@Autowired
	OrgDataJpa repo;
	
	@Autowired 
	UserDataJpa userRepo;
	
	@Autowired
	MembershipDataJpa membershipRepo;
	
	@Autowired
	MembershipService membershipService;
	
	public String handleOrgCreation(Organization org)throws EntityNotFoundException{
		
		Authentication auth=SecurityContextHolder.getContext().getAuthentication();	
		String email=auth.getName();
		Users owner=userRepo.findByEmail(email);	
		if(owner==null)throw new EntityNotFoundException("This account is invalid");
		org.setOwner(owner);
		String baseSlug=org.getName()
				.toLowerCase()
				.trim()
				.replace(' ', '-');
		String slug=baseSlug;
		int cnt=1;
		
		while(repo.existsBySlug(slug)) {
			slug=baseSlug+'-'+cnt;
			cnt++;
		}
		org.setSlug(slug);
		repo.save(org);
		membershipService.handleOwnerCreation(org, owner);
		return org.getSlug();
	}
	
	
	public String handleUpdateOrg(String slug,String name) throws AccessDeniedException, AuthenticationException{
			Authentication auth=SecurityContextHolder.getContext().getAuthentication();
			String email=auth.getName();
			Users requester=userRepo.findByEmail(email);
			if(requester==null)throw new AuthenticationException("Requester is unauthorized");
			Organization org=repo.findBySlug(slug);
			if(org==null)throw new EntityNotFoundException("Organization was not found");
			Membership requesterMembership=membershipRepo.findByUserIdAndOrgId(requester.getId(),org.getId());
			if(requesterMembership==null)throw new AccessDeniedException("Requester is not the part of the organization");
			Role requesterRole=requesterMembership.getRole();
			if(requesterRole!=Role.OWNER&&requesterRole!=Role.ADMIN)throw new AccessDeniedException("Requester doesnt have enough permissions");
			org.setName(name);
			String baseSlug=org.getName()
					.toLowerCase()
					.trim()
					.replace(' ', '-');
			String newSlug=baseSlug;
			int cnt=1;
			
			while(repo.existsBySlug(newSlug)) {
				newSlug=baseSlug+'-'+cnt;
				cnt++;
			}
			org.setSlug(newSlug);
			repo.save(org);
			return newSlug;
	}
	
	@Transactional
	public void handleDeleteOrg(String slug) throws AuthenticationException, AccessDeniedException {
		Authentication auth=SecurityContextHolder.getContext().getAuthentication();
		String email=auth.getName();
		Users requester=userRepo.findByEmail(email);
		if(requester==null)throw new AuthenticationException("Requester is unauthorized");
		Organization org=repo.findBySlug(slug);
		if(org==null)throw new EntityNotFoundException("Organization was not found");
		Membership requesterMembership=membershipRepo.findByUserIdAndOrgId(requester.getId(),org.getId());
		if(requesterMembership==null)throw new AccessDeniedException("Requester is not the part of the organization");
		Role requesterRole=requesterMembership.getRole();
		if(requesterRole!=Role.OWNER)throw new AccessDeniedException("Requester doesnt have enough permissions");
		membershipRepo.deleteAllByOrgId(org.getId());
		repo.deleteById(org.getId());
	}
	
	

	
}
