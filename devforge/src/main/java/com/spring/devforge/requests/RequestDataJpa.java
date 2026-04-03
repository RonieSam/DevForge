package com.spring.devforge.requests;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RequestDataJpa extends JpaRepository<Request,Long>{
	@Query("SELECT r FROM Request r JOIN FETCH r.user LEFT JOIN FETCH r.reviewedBy WHERE r.org.id=:orgId")
	public List<Request> findAllByOrgId(@Param("orgId")long orgId);
	public Request findByUserIdAndOrgId(long userId,long orgId);
	public boolean existsByUserIdAndOrgId(long userId,long orgId);
	
}
