package com.spring.devforge.comment;

import java.nio.file.AccessDeniedException;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.devforge.membership.Membership;
import com.spring.devforge.membership.MembershipService;
import com.spring.devforge.permissions.PermissionService;
import com.spring.devforge.permissions.Permissions;
import com.spring.devforge.task.TaskDataJpa;
import com.spring.devforge.task.Tasks;

import jakarta.persistence.EntityNotFoundException;

@Service
public class CommentService {
	
	@Autowired
	MembershipService memService;
	
	@Autowired
	TaskDataJpa taskRepo;
	
	@Autowired
	CommentDataJpa repo;
	
	@Autowired
	PermissionService permService;
	
	public CommentData handleAddComment(long taskId,String content) throws  AccessDeniedException {
		Tasks task=taskRepo.findById(taskId).orElseThrow(()->new EntityNotFoundException("Task does not exisit"));
		Membership reqMembership=memService.getMembership(task.getProject().getOrg().getSlug());
		permService.checkPermissions(reqMembership.getRole(),Permissions.COMMENT_CREATE);
		Comments com=new Comments(task,reqMembership.getUser(),content);
		repo.save(com);
		return CommentMapper.toData(com);
	}
	
	public void handleDeleteComments(long taskId,long commentId) throws  AccessDeniedException {
		Comments com=repo.findById(commentId).orElseThrow(()->new EntityNotFoundException("Comment does not exisit"));
		Tasks task=taskRepo.findById(taskId).orElseThrow(()->new EntityNotFoundException("Task does not exisit"));
		Membership reqMembership=memService.getMembership(task.getProject().getOrg().getSlug());
		if(!permService.hasPermission(reqMembership.getRole(), Permissions.COMMENT_DELETE)&&!com.getUser().getId().equals(reqMembership.getUser().getId())) {
			throw new AccessDeniedException("User does not have enough permissions");
		}
		repo.deleteById(commentId);
	}
	
	public List<CommentData> handleGetAllComments(long taskId)  {
		Tasks task=taskRepo.findById(taskId).orElseThrow(()->new EntityNotFoundException("Task does not exisit"));
		memService.getMembership(task.getProject().getOrg().getSlug());
		List<Comments> comments=repo.findAllByTaskId(taskId);
		return comments.stream().map(CommentMapper::toData).toList();
		
	}
	
}
