package com.spring.devforge.project;

import org.springframework.beans.factory.annotation.Autowired;

import com.spring.devforge.logs.ProjectLogsDataJpa;
import com.spring.devforge.logs.ProjectLogsService;
import com.spring.devforge.task.TaskDataJpa;

//public ProjectData(long id, String name, String slug, String creater,String desc,List<String> stack,String github) {


public class ProjectMapper {
	
	
	
	
	
	
	public static ProjectInfo toInfo(Project proj) {
		return new ProjectInfo(
					proj.getId(),
					proj.getName(),
					proj.getOrg().getSlug()
				);
	}
}
