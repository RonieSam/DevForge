package com.spring.devforge.project;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ProjectDataJpa extends JpaRepository<Project,Long> {
	@Query("SELECT p FROM Project p JOIN FETCH p.createdBy WHERE p.org.id=:orgId")
	List<Project> findAllByOrgId(@Param("orgId")long orgId);
	
}
