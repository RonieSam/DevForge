package com.spring.devforge.requests;

import java.nio.file.AccessDeniedException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.naming.AuthenticationException;

import org.apache.coyote.BadRequestException;
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
import com.spring.devforge.orgainzation.OrgDataJpa;
import com.spring.devforge.orgainzation.Organization;

import jakarta.persistence.EntityNotFoundException;

@Service
public class RequestService {
	
	@Autowired
	RequestDataJpa repo;
	
	@Autowired
	UserDataJpa userRepo;
	
	@Autowired
	OrgDataJpa orgRepo;
	
	@Autowired
	MembershipDataJpa memRepo;
	
	@Autowired
	MembershipService memService;
	
	public Users getAuthenticatedUser() {
		Authentication auth=SecurityContextHolder.getContext().getAuthentication();
		String email=auth.getName();
		Users user=userRepo.findByEmail(email);
		return user;
	}

	public Request handleRequestCreation(String slug,Role role) throws AccessDeniedException {
		if(role==null)role=Role.USER;
		Users user=getAuthenticatedUser();
		Organization org=orgRepo.findBySlug(slug);
		if(org==null)throw new EntityNotFoundException("The Organization is invalid");
		if(memRepo.existsByUserIdAndOrgId(user.getId(), org.getId()))throw new AccessDeniedException("Already part of this organization");
		if(role==Role.OWNER)throw new IllegalArgumentException("Owner roles can not be requested");
		Request req=repo.findByUserIdAndOrgId(user.getId(), org.getId());
		if(req!=null) {
			req.setRole(role);
			req.setStatus(Status.PENDING);
		}
		else {
			req=new Request(user,org,role);
		}
		repo.save(req);
		return req;
	}
	public List<GetRequestResponse> handleGetAllRequests(String slug) throws AuthenticationException{
		Organization org=orgRepo.findBySlug(slug);
		if(org==null)throw new EntityNotFoundException("The Organization is invalid");
		Users user=getAuthenticatedUser();
		if(!memRepo.existsByUserIdAndOrgId(user.getId(), org.getId()))throw new AuthenticationException("Not part of the organization");
		List<Request> reqs=new ArrayList<>();
		reqs=repo.findAllByOrgId(org.getId());
		List<GetRequestResponse> res=new ArrayList<>();
		for(Request r:reqs) {
			String reviewedBy=r.getReviewedBy()!=null?r.getReviewedBy().getUsername():null;

			res.add(new GetRequestResponse(r.getId(),r.getUser().getUsername(),r.getStatus(),r.getCreatedAt(),r.getRequestedRole(),reviewedBy,r.getReviewdAt()));
			
		}
		return res;
	}
	
	public Request handleReviewRequest(int id,Status status) throws AuthenticationException, AccessDeniedException, BadRequestException {
		Request req=repo.findById(id).orElse(null);
		if(req==null)throw new EntityNotFoundException("The request does not exisit");
		if(memRepo.existsByUserIdAndOrgId(req.getUser().getId(), req.getOrg().getId()))throw new BadRequestException("User already part of the organization");
		
		Users user=getAuthenticatedUser();
		Membership reqMembership=memRepo.findByUserIdAndOrgId(user.getId(), req.getOrg().getId() );
		if(reqMembership==null)throw new AuthenticationException("Not part of the organization");
		if(memService.isDenied(reqMembership.getRole(),req.getRequestedRole()))throw new AccessDeniedException("Do not have enough permmsion to perform this action");
		if(status==Status.APPROVED) {
			Membership newMembership=new Membership(req.getUser(),req.getOrg(),req.getRequestedRole());
			memRepo.save(newMembership);
		}	
		req.setAtReview(user, status);
		repo.save(req);
		return req;
	}
	
	public void handleDeleteRequest(int id) throws AccessDeniedException {
		Request req=repo.findById(id).orElse(null);
		if(req==null)throw new EntityNotFoundException("The request does not exisit");
		Users user=getAuthenticatedUser();
		Membership reqMembership=memRepo.findByUserIdAndOrgId(user.getId(), req.getOrg().getId() );
		if(req.getStatus()==Status.REJECTED||req.getStatus()==Status.APPROVED) {
			repo.deleteById(id);
			return;
		}
		if(memService.isDenied(reqMembership.getRole(),req.getRequestedRole()))throw new AccessDeniedException("Do not have enough permmsion to perform this action");
		repo.deleteById(id);
	}
}
