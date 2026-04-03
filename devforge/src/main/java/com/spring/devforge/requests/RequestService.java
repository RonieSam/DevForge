package com.spring.devforge.requests;

import java.nio.file.AccessDeniedException;
import java.util.ArrayList;
import java.util.List;

import org.apache.coyote.BadRequestException;
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
	
	@Autowired
	AuthService authService;
	
	@Autowired
	PermissionService permService;

	public RequestData handleRequestCreation(String slug,Role role) throws AccessDeniedException {
		if(role==null)role=Role.USER;
		Users user=authService.getUser();
		Organization org=orgRepo.findBySlug(slug);
		if(org==null)throw new EntityNotFoundException("The Organization is invalid");
		if(memRepo.existsByUserIdAndOrgId(user.getId(), org.getId()))throw new AccessDeniedException("Already part of this organization");
		if(role==Role.OWNER)throw new IllegalArgumentException("Owner roles can not be requested");
		Request req=repo.findByUserIdAndOrgId(user.getId(), org.getId());
		if(req!=null) {
			req.setRole(role);
			req.setStatus(RequestStatus.PENDING);
		}
		else {
			req=new Request(user,org,role);
		}
		repo.save(req);
		return RequestMapper.toData(req);
	}
	public List<RequestData> handleGetAllRequests(String slug) throws  AccessDeniedException{
		Organization org=orgRepo.findBySlug(slug);
		if(org==null)throw new EntityNotFoundException("The Organization is invalid");
		Membership membership=memService.getMembership(slug);
		permService.checkPermissions(membership.getRole(),Permissions.REQUEST_VIEW);
		List<Request> reqs=new ArrayList<>();
		reqs=repo.findAllByOrgId(org.getId());
		return reqs.stream().map(RequestMapper::toData).toList();
	}
	
	public RequestData handleReviewRequest(long id,RequestStatus status,String slug) throws AccessDeniedException, BadRequestException {
		Request req=repo.findById(id).orElse(null);
		if(req==null)throw new EntityNotFoundException("The request does not exisit");
		if(memRepo.existsByUserIdAndOrgId(req.getUser().getId(), req.getOrg().getId()))throw new BadRequestException("User already part of the organization");
		
		Membership reqMembership=memService.getMembership(slug);
		permService.checkPermissions(reqMembership.getRole(),Permissions.REQUEST_APPROVE);
		permService.isDenied(reqMembership.getRole(), req.getRequestedRole());
		if(status==RequestStatus.APPROVED) {
			Membership newMembership=new Membership(req.getUser(),req.getOrg(),req.getRequestedRole());
			memRepo.save(newMembership);
		}	
		req.setAtReview(reqMembership.getUser(), status);
		repo.save(req);
		return RequestMapper.toData(req);
	}
	
	public void handleDeleteRequest(long id,String slug) throws AccessDeniedException {
		Membership reqMembership=memService.getMembership(slug);
		permService.checkPermissions(reqMembership.getRole(), Permissions.REQUEST_DELETE);
		Request req=repo.findById(id).orElse(null);
		if(req==null)throw new EntityNotFoundException("The request does not exisit");
		repo.deleteById(id);
	}
}
