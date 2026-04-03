package com.spring.devforge.project;

import java.nio.file.AccessDeniedException;
import java.util.ArrayList;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.spring.devforge.authentication.AuthService;
import com.spring.devforge.authentication.UserDataJpa;
import com.spring.devforge.membership.Membership;
import com.spring.devforge.membership.MembershipDataJpa;
import com.spring.devforge.membership.MembershipService;
import com.spring.devforge.orgainzation.OrgDataJpa;
import com.spring.devforge.permissions.PermissionService;
import com.spring.devforge.permissions.Permissions;


import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
public class ProjectService {
	
	
	@Autowired
	ProjectDataJpa repo;
	
	@Autowired
	OrgDataJpa orgRepo;
	
	@Autowired 
	UserDataJpa userRepo;
	
	@Autowired
	MembershipDataJpa membershipRepo;
	
	@Autowired
	MembershipService membershipService;
	
	@Autowired
	AuthService authService;
	
	
	@Autowired
	PermissionService permService;
	
	
	public ProjectData handleProjectCreation(String name,String slug) throws AccessDeniedException{
		
		Membership reqMembership=membershipService.getMembership(slug);
		permService.checkPermissions(reqMembership.getRole(), Permissions.PROJECT_CREATE);
		Project proj=new Project(name,reqMembership.getUser(),reqMembership.getOrg());
		repo.save(proj);
		return ProjectMapper.toData(proj);
	}
	
	@Transactional
	public void handleProjectDeletion(long id,String slug) throws AccessDeniedException{
		Membership reqMembership=membershipService.getMembership(slug);
		permService.checkPermissions(reqMembership.getRole(), Permissions.PROJECT_DELETE);
		if(!repo.existsById(id))throw new EntityNotFoundException("The project does not exsist");
		repo.deleteById(id);
	}
	
	public ProjectData handleProjectUpdation(long id,String slug,String name) throws AccessDeniedException{

		Membership reqMembership=membershipService.getMembership(slug);
		permService.checkPermissions(reqMembership.getRole(), Permissions.PROJECT_UPDATE);
		
		Project proj=repo.findById(id).orElseThrow(()->new EntityNotFoundException("The project does not exsist"));
		if(proj==null)throw new EntityNotFoundException("Project does not exsist");
		proj.setName(name);		
		proj.newUpdate();
		repo.save(proj);
		return ProjectMapper.toData(proj);
	}

	public List<ProjectData> handleGetAllProject(String slug){
		Membership reqMembership=membershipService.getMembership(slug);
		List<Project> projs=new ArrayList<>();
		projs=repo.findAllByOrgId(reqMembership.getOrg().getId());
		List<ProjectData> data=projs.stream().map(ProjectMapper::toData).toList();
		return data;
	}
	public ProjectData handleGetProject(long id) throws AccessDeniedException{
		Project proj=repo.findById(id).orElseThrow(()->new EntityNotFoundException("Project not found"));
		membershipService.getMembership(proj.getOrg().getSlug());
		return ProjectMapper.toData(proj);
	}
	
}
