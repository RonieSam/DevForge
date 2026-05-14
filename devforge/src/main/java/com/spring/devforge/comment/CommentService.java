package com.spring.devforge.comment;

import java.nio.file.AccessDeniedException;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.devforge.membership.Membership;
import com.spring.devforge.membership.MembershipService;
import com.spring.devforge.permissions.PermissionService;
import com.spring.devforge.permissions.Permissions;
import com.spring.devforge.project.Project;
import com.spring.devforge.project.ProjectDataJpa;
import com.spring.devforge.task.TaskDataJpa;
import com.spring.devforge.task.Tasks;

import jakarta.persistence.EntityNotFoundException;

@Service
public class CommentService {
	
	@Autowired
	MembershipService memService;
	
	@Autowired
	ProjectDataJpa projRepo;
	
	@Autowired
	CommentDataJpa repo;
	
	@Autowired
	PermissionService permService;
	
	public CommentData handleAddComment(long projId,String content) throws  AccessDeniedException {
		Project proj=projRepo.findById(projId).orElseThrow(()->new EntityNotFoundException("Task does not exisit"));
		Membership reqMembership=memService.getMembership(proj.getOrg().getSlug());
		permService.checkPermissions(reqMembership.getRole(),Permissions.COMMENT_CREATE);
		Comments com=new Comments(proj,reqMembership.getUser(),content);
		repo.save(com);
		return CommentMapper.toData(com);
	}
	

	public List<CommentData> handleGetAllComments(long projId)  {
		Project proj=projRepo.findById(projId).orElseThrow(()->new EntityNotFoundException("Task does not exisit"));
		memService.getMembership(proj.getOrg().getSlug());
		List<Comments> comments=repo.findAllByProjId(projId);
		return comments.stream().map(CommentMapper::toData).toList();
		
	}
	
}
