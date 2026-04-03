package com.spring.devforge.membership;

import java.nio.file.AccessDeniedException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.authentication.InsufficientAuthenticationException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

import com.spring.devforge.authentication.AuthService;
import com.spring.devforge.authentication.UserDataJpa;
import com.spring.devforge.authentication.Users;
import com.spring.devforge.orgainzation.OrgDataJpa;
import com.spring.devforge.orgainzation.Organization;
import com.spring.devforge.permissions.PermissionService;
import com.spring.devforge.permissions.Permissions;

import jakarta.persistence.EntityNotFoundException;


@Service
public class MembershipService {
	

	
	@Autowired
	MembershipDataJpa repo;
	
	@Autowired
	UserDataJpa userRepo;
	
	@Autowired
	OrgDataJpa orgRepo;
	
	@Autowired
	AuthService authService;
	
	@Autowired 
	PermissionService permService;
	
	
	
	public Membership getMembership(String slug) throws InsufficientAuthenticationException{
	    Users user=authService.getUser();
	    System.out.println(user.getUsername());

	    Organization org = orgRepo.findBySlug(slug);
	    if (user == null || org == null) {
	        throw new EntityNotFoundException("User or organization does not exist");
	    }
	    Membership membership = repo.findByUserIdAndOrgId(user.getId(), org.getId());

	    if (membership == null) {
	        throw new InsufficientAuthenticationException("Not part of this organization");
	    }

	    return membership;
	}
	
	public void handleOwnerCreation(Organization org,Users owner) {
		repo.save(new Membership(owner,org,Role.OWNER));
	}
	
	
	
	public MembershipData handleMembershipCreation(String slug,String username,Role role) throws AccessDeniedException, AuthenticationException {
		Membership reqMembership=getMembership(slug);
		permService.checkPermissions(reqMembership.getRole(), Permissions.MEMBER_ADD);
		permService.isDenied(reqMembership.getRole(), role);
		Users user=userRepo.findByUsername(username);
		Organization org=orgRepo.findBySlug(slug);
		if(user==null||org==null)throw new EntityNotFoundException("The user or the organization is invalid");
		if(repo.existsByUserIdAndOrgId(user.getId(), org.getId()))throw new IllegalArgumentException("The user is already part of the organization");
		
		if(reqMembership.getRole()==Role.OWNER&&role==Role.OWNER) {
			reqMembership.setRole(Role.ADMIN);
			repo.save(reqMembership);
			org.setOwner(user);
			orgRepo.save(org);	
		}
		
		Membership newMembership=new Membership(user,org,role);
		repo.save(newMembership);
		return MemberMapper.toData(newMembership);
		
		
	}
	public MembershipData handleMembershipUpdation(String slug,String username,Role role) throws EntityNotFoundException, AccessDeniedException, AuthenticationException{
		Membership reqMembership=getMembership(slug);
		permService.checkPermissions(reqMembership.getRole(), Permissions.MEMBER_ROLE_UPDATE);
		permService.isDenied(reqMembership.getRole(), role);
		
		Users user=userRepo.findByUsername(username);
		Organization org=orgRepo.findBySlug(slug);
		if(user==null)throw new EntityNotFoundException("The user does not exsist");
		
		Membership membership=repo.findByUserIdAndOrgId(user.getId(), org.getId());
		if(membership==null)throw new IllegalArgumentException("The user is already part of the organization");
		if(reqMembership.getRole()==Role.OWNER&&role==Role.OWNER) {
			reqMembership.setRole(Role.ADMIN);
			repo.save(reqMembership);
			org.setOwner(user);
			orgRepo.save(org);

		}
		
		membership.setRole(role);
		repo.save(membership);
		return MemberMapper.toData(membership);
	}
	
	public void handleMembershipDeletion(String slug,String username) throws AccessDeniedException,EntityNotFoundException, AuthenticationException{
		Membership reqMembership=getMembership(slug);
		permService.checkPermissions(reqMembership.getRole(), Permissions.MEMBER_REMOVE);
		
		Users user=userRepo.findByUsername(username);
		Organization org=orgRepo.findBySlug(slug);
		if(user==null)throw new EntityNotFoundException("User does not exsist");
		Membership membership=repo.findByUserIdAndOrgId(user.getId(), org.getId());
		if(membership==null)throw new EntityNotFoundException("User is already not part of the organization");
		
		permService.isDenied(reqMembership.getRole(), membership.getRole());
		
		
		if(membership.getRole()==Role.OWNER) throw new AccessDeniedException("Owner membership cannot be deleted without transferring ownership");
		
		repo.deleteById(membership.getId());
	}
	
	public List<MembershipData> handleGetAllMembers(String slug) throws AuthenticationException{
		Organization org=orgRepo.findBySlug(slug);
		if(org==null)throw new EntityNotFoundException("Invalid orgaanization");
		
		getMembership(slug);
		List<Membership> members=repo.findAllByOrgId(org.getId());
		
		return members.stream().map(MemberMapper::toData).toList();
	}

	
	
	
	
	
	
}
