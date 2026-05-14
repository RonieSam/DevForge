package com.spring.devforge.project;

import java.nio.file.AccessDeniedException;
import java.util.ArrayList;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.spring.devforge.authentication.AuthService;
import com.spring.devforge.authentication.UserDataJpa;
import com.spring.devforge.authentication.Users;
import com.spring.devforge.logs.ProjectLogsDataJpa;
import com.spring.devforge.logs.ProjectLogsService;
import com.spring.devforge.membership.Membership;
import com.spring.devforge.membership.MembershipDataJpa;
import com.spring.devforge.membership.MembershipService;
import com.spring.devforge.orgainzation.OrgDataJpa;
import com.spring.devforge.orgainzation.Organization;
import com.spring.devforge.permissions.PermissionService;
import com.spring.devforge.permissions.Permissions;
import com.spring.devforge.task.TaskDataJpa;
import com.spring.devforge.task.TaskService;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

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
	ProjectLogsService logService;
	
	@Autowired
	PermissionService permService;
	
	@Autowired
	TaskService taskService;
	
	
	
//		public Project(@NotBlank @Size(min = 5) String name, @NotNull Users createdBy,@NotNull Organization org,@NotNull String desc,List<String> stack,String github) {

	public ProjectData handleProjectCreation(String name,String slug,String desc,List<String> stack,String github) throws AccessDeniedException{
		Membership reqMembership=membershipService.getMembership(slug);
		permService.checkPermissions(reqMembership.getRole(), Permissions.PROJECT_CREATE);
		Project proj=new Project(name,reqMembership.getUser(),reqMembership.getOrg(),desc,stack,github);
		repo.save(proj);
		logService.addLogs("Created "+name+" Project", reqMembership.getUser(), proj);
		return new ProjectData(
		        proj.getId(),
		        proj.getName(),
		        proj.getOrg().getSlug(),
		        proj.getCreatedBy().getUsername(),
		        proj.getDesc(),
		        proj.getStack(),
		        proj.getGithub(),
		        logService.getProjectLogs(proj.getId()),
		        taskService.handleGetAllProjTasks(proj.getId())
		    );
	}
	
	@Transactional
	public void handleProjectDeletion(long id,String slug) throws AccessDeniedException{
		Membership reqMembership=membershipService.getMembership(slug);
		permService.checkPermissions(reqMembership.getRole(), Permissions.PROJECT_DELETE);
		if(!repo.existsById(id))throw new EntityNotFoundException("The project does not exsist");
		repo.deleteById(id);
	}
	
	public ProjectData handleProjectUpdation(long id,String name,String desc,List<String> stack,String github) throws AccessDeniedException{

		Project proj=repo.findById(id).orElseThrow(()->new EntityNotFoundException("The project does not exsist"));
		Membership reqMembership=membershipService.getMembership(proj.getOrg().getSlug());
		permService.checkPermissions(reqMembership.getRole(), Permissions.PROJECT_UPDATE);
		
		proj.setName(name);		
		proj.setDesc(desc);
		proj.setStack(stack);
		proj.setGithub(github);
		repo.save(proj);
		logService.addLogs("Edited "+name+" Project Info", reqMembership.getUser(), proj);

		return new ProjectData(
		        proj.getId(),
		        proj.getName(),
		        proj.getOrg().getSlug(),
		        proj.getCreatedBy().getUsername(),
		        proj.getDesc(),
		        proj.getStack(),
		        proj.getGithub(),
		        logService.getProjectLogs(proj.getId()),
		        taskService.handleGetAllProjTasks(proj.getId())
		    );
	}

	public List<ProjectInfo> handleGetAllProject(String slug){
		Membership reqMembership=membershipService.getMembership(slug);
		List<Project> projs=new ArrayList<>();
		projs=repo.findAllByOrgId(reqMembership.getOrg().getId());
		List<ProjectInfo> data=projs.stream().map(ProjectMapper::toInfo).toList();
		return data;
	}
	public ProjectData handleGetProject(long id) throws AccessDeniedException{
		Project proj=repo.findById(id).orElseThrow(()->new EntityNotFoundException("Project not found"));
		System.out.println(proj.getLogs().size());
		System.out.println(proj.getTasks().size());
		membershipService.getMembership(proj.getOrg().getSlug());
		return new ProjectData(
		        proj.getId(),
		        proj.getName(),
		        proj.getOrg().getSlug(),
		        proj.getCreatedBy().getUsername(),
		        proj.getDesc(),
		        proj.getStack(),
		        proj.getGithub(),
		        logService.getProjectLogs(proj.getId()),
		        taskService.handleGetAllProjTasks(proj.getId())
		    );
	}
	
}
