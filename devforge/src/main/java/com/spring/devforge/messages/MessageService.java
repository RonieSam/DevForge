package com.spring.devforge.messages;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import com.spring.devforge.authentication.AuthService;
import com.spring.devforge.authentication.UserDataJpa;
import com.spring.devforge.authentication.Users;
import com.spring.devforge.membership.Membership;
import com.spring.devforge.membership.MembershipService;
import com.spring.devforge.project.Project;
import com.spring.devforge.project.ProjectDataJpa;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
public class MessageService {
	
	
	@Autowired
	MessageDataJpa repo;
	
	@Autowired
	SimpMessagingTemplate messageTemplate;
	
	@Autowired
	UserDataJpa userRepo;
	
	@Autowired
	MembershipService membershipService;
	
	@Autowired
	ProjectDataJpa projRepo;
	
	public void createMessage(String content,String sender,long projId) {
		Project proj=projRepo.findById(projId).orElseThrow(()->new EntityNotFoundException("The project does not exsist"));
		Users user=userRepo.findByUsername(sender);
		Message msg=new Message(content,user,proj);
		repo.save(msg);
		MessageData res=MessageMapper.mapper(msg);
		messageTemplate.convertAndSend("/topic/projects/"+projId,res);

	}
	public List<MessageData> getMessages(@PathVariable long projId) {
		Project proj=projRepo.findById(projId).orElseThrow(()->new EntityNotFoundException("The project does not exsist"));
		membershipService.getMembership(proj.getOrg().getSlug());
		return repo.findAllByProjectId(projId).stream().map(MessageMapper::mapper).toList();
	}
}
