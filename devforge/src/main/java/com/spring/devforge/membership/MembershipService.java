package com.spring.devforge.membership;

import java.nio.file.AccessDeniedException;
import java.util.ArrayList;
import java.util.List;

import javax.naming.AuthenticationException;

import org.apache.coyote.BadRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.spring.devforge.authentication.UserDataJpa;
import com.spring.devforge.authentication.Users;
import com.spring.devforge.orgainzation.OrgDataJpa;
import com.spring.devforge.orgainzation.Organization;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import jakarta.validation.ConstraintViolationException;

@Service
public class MembershipService {
	

	
	@Autowired
	MembershipDataJpa repo;
	
	@Autowired
	UserDataJpa userRepo;
	
	@Autowired
	OrgDataJpa orgRepo;
	
	public void handleOwnerCreation(Organization org,Users owner) {
		repo.save(new Membership(owner,org,Role.OWNER));
	}
	
	public boolean isDenied(Role requester,Role user) {
		if(requester==null||requester==Role.USER||(requester==Role.ADMIN&&(user==Role.OWNER||user==Role.ADMIN))) return true;
		else return false;
		
	}
	
	public void handleMembershipCreation(String slug,String username,Role role) throws AccessDeniedException, AuthenticationException {
		
		Users user=userRepo.findByUsername(username);
		Organization org=orgRepo.findBySlug(slug);
		if(user==null||org==null)throw new EntityNotFoundException("The user or the organization is invalid");
		if(repo.existsByUserIdAndOrgId(user.getId(), org.getId()))throw new IllegalArgumentException("The user is already part of the organization");
		Authentication auth=SecurityContextHolder.getContext().getAuthentication();
		String email=auth.getName();
		Users requester=userRepo.findByEmail(email);
		Membership reqMembership=repo.findByUserIdAndOrgId(requester.getId(), org.getId());
		if(reqMembership==null)throw new AuthenticationException("The requester is not authorized for this action");
		if(isDenied(reqMembership.getRole(),role)) {
			throw new AccessDeniedException("Requesting user doesnt have enough authority");
		}
		if(reqMembership.getRole()==Role.OWNER&&role==Role.OWNER) {
			reqMembership.setRole(Role.ADMIN);
			repo.save(reqMembership);
			org.setOwner(user);
			orgRepo.save(org);	
		}
		
		Membership newMembership=new Membership(user,org,role);
		repo.save(newMembership);
		
		
	}
	public void handleMembershipUpdation(String slug,String username,Role role) throws EntityNotFoundException, AccessDeniedException, AuthenticationException{
		Users user=userRepo.findByUsername(username);
		Organization org=orgRepo.findBySlug(slug);
		if(user==null||org==null)throw new EntityNotFoundException("The user or the organization is invalid");
		Authentication auth=SecurityContextHolder.getContext().getAuthentication();
		String email=auth.getName();
		Users requester=userRepo.findByEmail(email);
		Membership reqMembership=repo.findByUserIdAndOrgId(requester.getId(), org.getId());
		if(reqMembership==null)throw new AuthenticationException("The requester is not authorized for this action");
		if(isDenied(reqMembership.getRole(),role)) {
			throw new AccessDeniedException("Requesting user doesnt have enough authority");
		}
		if(reqMembership.getRole()==Role.OWNER&&role==Role.OWNER) {
			reqMembership.setRole(Role.ADMIN);
			repo.save(reqMembership);
			org.setOwner(user);
			orgRepo.save(org);

		}
		Membership membership=repo.findByUserIdAndOrgId(user.getId(), org.getId());
		if(membership==null)throw new EntityNotFoundException("User is not part of the organization");
		membership.setRole(role);
		repo.save(membership);
	}
	
	public void handleMembershipDeletion(String slug,String username) throws AccessDeniedException,EntityNotFoundException, AuthenticationException{
		Users user=userRepo.findByUsername(username);
		Organization org=orgRepo.findBySlug(slug);
		if(user==null||org==null)throw new EntityNotFoundException("This request cannot be processed");
		Authentication auth=SecurityContextHolder.getContext().getAuthentication();
		String email=auth.getName();
		Users requester=userRepo.findByEmail(email);
		Membership reqMembership=repo.findByUserIdAndOrgId(requester.getId(), org.getId());
		if(reqMembership==null)throw new AuthenticationException("The requester is not authorized for this action");
		Membership membership=repo.findByUserIdAndOrgId(user.getId(), org.getId());
		if(membership==null)throw new EntityNotFoundException("User is already not part of the organization");
		if(membership.getRole()==Role.OWNER) throw new AccessDeniedException("Owner membership cannot be deleted without transferring ownership");
		if(isDenied(reqMembership.getRole(),membership.getRole())) {
			throw new AccessDeniedException("Requesting user doesnt have enough authority");
		}
		repo.deleteById(membership.getId());
	}
	
	public List<GetMembersResponse> handleGetAllMembers(String slug) throws AuthenticationException{
		Organization org=orgRepo.findBySlug(slug);
		if(org==null)throw new EntityNotFoundException("This request cannot be processed");
		Authentication auth=SecurityContextHolder.getContext().getAuthentication();
		String email=auth.getName();
		Users requester=userRepo.findByEmail(email);
		Membership reqMembership=repo.findByUserIdAndOrgId(requester.getId(), org.getId());
		if(reqMembership==null)throw new AuthenticationException("The requester is not authorized for this action");
		List<Membership> members=repo.findAllByOrgId(org.getId());
		List<GetMembersResponse> res=new ArrayList<>();
		for(Membership m:members) {
			res.add(new GetMembersResponse(m.getUser().getUsername(),m.getUser().getEmail(),m.getRole()));
		}
		return res;
	}
	public List<GetMembersResponse> handleGetAllMembersWithRole(String slug,Role role) throws AuthenticationException{
		Organization org=orgRepo.findBySlug(slug);
		if(org==null)throw new EntityNotFoundException("This request cannot be processed");
		Authentication auth=SecurityContextHolder.getContext().getAuthentication();
		String email=auth.getName();
		Users requester=userRepo.findByEmail(email);
		Membership reqMembership=repo.findByUserIdAndOrgId(requester.getId(), org.getId());
		if(reqMembership==null)throw new AuthenticationException("The requester is not authorized for this action");
		List<Membership> members=repo.findAllByOrgIdAndRole(org.getId(),role);
		List<GetMembersResponse> res=new ArrayList<>();
		for(Membership m:members) {
			res.add(new GetMembersResponse(m.getUser().getUsername(),m.getUser().getEmail(),m.getRole()));
		}
		return res;
	}
	
	
	
	
	
}
