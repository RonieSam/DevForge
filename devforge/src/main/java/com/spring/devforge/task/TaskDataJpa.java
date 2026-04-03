package com.spring.devforge.task;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskDataJpa extends JpaRepository<Tasks,Long>{
	public List<Tasks> findAllByProjectId(long projectId);
}
