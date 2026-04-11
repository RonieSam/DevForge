package com.spring.devforge.task;

import java.nio.file.AccessDeniedException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.naming.AuthenticationException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.devforge.authentication.AuthService;
import com.spring.devforge.authentication.UserDataJpa;
import com.spring.devforge.authentication.Users;
import com.spring.devforge.membership.Membership;
import com.spring.devforge.membership.MembershipDataJpa;
import com.spring.devforge.membership.MembershipService;
import com.spring.devforge.membership.Role;
import com.spring.devforge.orgainzation.OrgDataJpa;
import com.spring.devforge.orgainzation.Organization;
import com.spring.devforge.permissions.PermissionService;
import com.spring.devforge.permissions.Permissions;
import com.spring.devforge.project.Project;
import com.spring.devforge.project.ProjectDataJpa;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.constraints.NotEmpty;

@Service
public class TaskService {
	
	@Autowired
	ProjectDataJpa projRepo;
	
	@Autowired
	MembershipService memService;
	
	@Autowired
	MembershipDataJpa memRepo;
	
	@Autowired
	UserDataJpa userRepo;
	
	@Autowired
	TaskDataJpa repo;
	
	@Autowired
	PermissionService permService;
	
	@Autowired
	OrgDataJpa orgRepo;
	
	@Autowired
	AuthService authService;

	public TaskData handleTaskCreation(String desc,LocalDateTime deadline,long projectId,String assignedTo,Priority priority) throws AuthenticationException, AccessDeniedException {
		Project proj=projRepo.findById(projectId).orElseThrow(()-> new EntityNotFoundException("Project does not exisit"));
		Membership reqMembership=memService.getMembership(proj.getOrg().getSlug());
		permService.checkPermissions(reqMembership.getRole(), Permissions.TASK_CREATE);
		Users user=userRepo.findByUsername(assignedTo);
		if(user==null)throw new EntityNotFoundException("Recipiant does not exisit");
		if(!memRepo.existsByUserIdAndOrgId(user.getId(), proj.getOrg().getId()))throw new EntityNotFoundException("Recipiant is not part of the organization");
		Tasks newTask=new Tasks(desc,deadline,proj,user,reqMembership.getUser(),priority);
		repo.save(newTask);
		return TaskMapper.toData(newTask);
	}
	
	public TaskData handleTaskUpdation(String desc,LocalDateTime deadline,String assignedTo,Priority priority,long taskId,TaskStatus status) throws AuthenticationException, AccessDeniedException {
		
		Tasks task=repo.findById(taskId).orElseThrow(()->new EntityNotFoundException("Task not found"));
		Project proj=task.getProject();
		Membership reqMembership=memService.getMembership(proj.getOrg().getSlug());
		permService.checkPermissions(reqMembership.getRole(), Permissions.TASK_UPDATE);
		if(!task.getAssignedTo().getUsername().equals(assignedTo)) {
			Users user=userRepo.findByUsername(assignedTo);
			if(user==null)throw new EntityNotFoundException("Recipiant does not exisit");
			if(!memRepo.existsByUserIdAndOrgId(user.getId(), proj.getOrg().getId()))throw new EntityNotFoundException("Recipiant is not part of the organization");
			task.setAssignedTo(user);
		}
		task.setDescription(desc);
		task.setDeadline(deadline);
		task.setPriority(priority);
		if((status==TaskStatus.UNDERREVIEW&&reqMembership.getUser().getId().equals(task.getAssignedTo().getId()))||reqMembership.getUser().getId().equals(task.getCreatedBy().getId()))
			task.setStatus(status);
		repo.save(task);
		return TaskMapper.toData(task);
	}
	
	public void deleteTask(long id) throws AuthenticationException, AccessDeniedException {
		Tasks task=repo.findById(id).orElseThrow(()->new EntityNotFoundException("Task not found"));
		Project proj=task.getProject();
		if(proj==null)throw new EntityNotFoundException("Project does not exisit");
		Membership reqMembership=memService.getMembership(proj.getOrg().getSlug());
		permService.checkPermissions(reqMembership.getRole(), Permissions.TASK_DELETE);
		repo.delete(task);
	}
	
	public List<TaskData> handleGetAllTasks(long projId) throws AuthenticationException{
		Project proj=projRepo.findById(projId).orElseThrow(()->new  EntityNotFoundException("Project does not exisit"));
		if(proj==null)throw new EntityNotFoundException("Project does not exisit");
		memService.getMembership(proj.getOrg().getSlug());
		List<Tasks> tasks=repo.findAllByProjectId(projId);
		return tasks.stream().map(TaskMapper::toData).toList();
		
	}
	
	public List<TaskData> handleGetAllUserOrgTasks(Long orgId){
		List<Tasks> tasks=new ArrayList<>();
		if(orgId==null) {
			Users user=authService.getUser();
			tasks=repo.findAllByAssignedToId(user.getId());
		}
		else {
			Organization org=orgRepo.findById(orgId).orElseThrow(()->new EntityNotFoundException());
			Membership reqMembership=memService.getMembership(org.getSlug());

			tasks=repo.findAllByOrgAndAssignedToId(reqMembership.getOrg().getId(), reqMembership.getUser().getId());
		}
		return tasks.stream().map(TaskMapper::toData).toList();

	}
	
	
}
