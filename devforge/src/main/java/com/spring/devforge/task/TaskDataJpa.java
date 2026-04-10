package com.spring.devforge.task;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TaskDataJpa extends JpaRepository<Tasks,Long>{
	public List<Tasks> findAllByProjectId(long projectId);
	public List<Tasks> findAllByAssignedToId(long assignedToId);
	
	@Query("SELECT t FROM Tasks t JOIN t.project p WHERE p.org.id=:orgId")
	public List<Tasks> findAllByOrg(@Param("orgId")long orgId);

}
