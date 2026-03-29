package com.spring.devforge.membership;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


public interface MembershipDataJpa extends JpaRepository<Membership,Integer> {
	public boolean existsByUserIdAndOrgId(int userId,int orgId);
	public Membership findByUserIdAndOrgId(int userId,int orgId);
	public void deleteAllByOrgId(int orgId);
	
	public List<Membership> findAllByOrgId(int orgId);
	public List<Membership> findAllByOrgIdAndRole(int orgId,Role role);

}
