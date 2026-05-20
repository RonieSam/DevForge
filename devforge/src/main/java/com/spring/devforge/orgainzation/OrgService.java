package com.spring.devforge.orgainzation;

import java.nio.file.AccessDeniedException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.spring.devforge.authentication.AuthService;
import com.spring.devforge.authentication.UserDataJpa;
import com.spring.devforge.authentication.Users;
import com.spring.devforge.membership.Membership;
import com.spring.devforge.membership.MembershipData;
import com.spring.devforge.membership.MembershipDataJpa;
import com.spring.devforge.membership.MembershipService;
import com.spring.devforge.permissions.PermissionService;
import com.spring.devforge.permissions.Permissions;
import com.spring.devforge.project.ProjectInfo;
import com.spring.devforge.project.ProjectService;
import com.spring.devforge.requests.RequestData;
import com.spring.devforge.requests.RequestService;

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
	
	@Autowired
	RequestService reqService;
	
	@Autowired
	PermissionService permService;
	
	@Autowired
	AuthService authService;
	
	@Autowired
	ProjectService projService;
	
	public List<UserOrgData> handleGetAllOrg(){
		Users user=authService.getUser();
		List<Membership> orgs=membershipRepo.findAllByUserId(user.getId());
		return orgs.stream().map(OrgMapper::toData).toList();
	}
	
	public OrgInfo handleGetOrg(long id) throws AccessDeniedException {
		Organization org=repo.findById(id).orElseThrow(()->new EntityNotFoundException("Organization not found"));
		Membership mem=membershipService.getMembership(org.getSlug());
		List<MembershipData> members=membershipService.handleGetAllMembers(id);
		List<RequestData> requests=reqService.handleGetAllRequests(id);
		
		List<ProjectInfo> projects=projService.handleGetAllProject(org.getSlug());
		return new OrgInfo(
				org.getId(),
				org.getSlug(),
				org.getOwner().getUsername(),
				members,
				requests,
				projects
				);
	}
//	String slug, String owner, List<MembershipData> members,
//	List<RequestData> requests, List<ProjectInfo> projects
	public UserOrgData handleOrgCreation(String name)throws EntityNotFoundException{
		Users owner=authService.getUser();	
		if(owner==null)throw new EntityNotFoundException("This account is invalid");
		String baseSlug=name
				.toLowerCase()
				.trim()
				.replace(' ', '-');
		String slug=baseSlug;
		int cnt=1;
		
		while(repo.existsBySlug(slug)) {
			slug=baseSlug+'-'+cnt;
			cnt++;
		}
		Organization org=new Organization(name,owner,slug);
		repo.save(org);
		Membership mem=membershipService.handleOwnerCreation(org, owner);
		return OrgMapper.toData(mem);
	}
	
	
	public OrgData handleUpdateOrg(String slug,String name) throws AccessDeniedException{
			Membership requesterMembership=membershipService.getMembership(slug);
			if(requesterMembership==null)throw new AccessDeniedException("Requester is not the part of the organization");
			permService.checkPermissions(requesterMembership.getRole(), Permissions.ORGANIZATION_UPDATE);
			Organization org=repo.findBySlug(slug);
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
			return OrgMapper.toData(org);
	}
	
	@Transactional
	public void handleDeleteOrg(String slug) throws  AccessDeniedException {
		Membership requesterMembership=membershipService.getMembership(slug);
		if(requesterMembership==null)throw new AccessDeniedException("Requester is not the part of the organization");
		permService.checkPermissions(requesterMembership.getRole(), Permissions.ORGAINZATION_DELETE);
		Organization org=repo.findBySlug(slug);
		membershipRepo.deleteAllByOrgId(org.getId());
		repo.deleteById(org.getId());
	}
	
	public List<OrgData> handleGetOrgPrefix(String prefix) {
		List<Organization> orgs=repo.findAllBySlugStartingWith(prefix);
		return orgs.stream().map(OrgMapper::toData).toList();
	}
	
	

	
}
