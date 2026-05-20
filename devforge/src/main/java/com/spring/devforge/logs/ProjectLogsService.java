package com.spring.devforge.logs;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.devforge.authentication.Users;
import com.spring.devforge.project.Project;

@Service
public class ProjectLogsService {
	
	@Autowired
	ProjectLogsDataJpa repo;
	
	public void addLogs(String action,Users user,Project proj) {
		ProjectLogs log=new ProjectLogs(action,user,proj);
		repo.save(log);
	}
	
	public List<String> getProjectLogs(long projId){
		List<ProjectLogs> logs=repo.findAllByProjId(projId);
		return logs.stream().map(log->{return (log.getActionBy().getUsername()+" "+log.getAction());}).toList();
	}
	
}
