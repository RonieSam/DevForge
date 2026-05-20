package com.spring.devforge.logs;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectLogsDataJpa extends JpaRepository<ProjectLogs,Long> {
	public List<ProjectLogs> findAllByProjId(long projId);
}
