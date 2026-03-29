package com.spring.devforge.requests;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RequestDataJpa extends JpaRepository<Request,Integer>{
	public List<Request> findAllByOrgId(int orgId);
	public Request findByUserIdAndOrgId(int userId,int orgId);
	public boolean existsByUserIdAndOrgId(int userId,int orgId);
	public List<Request> findAllByOrgIdAndStatus(int orgId,Status status);
	
}
