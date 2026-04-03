package com.spring.devforge.project;



public class ProjectMapper {
	public static ProjectData toData(Project proj) {
		return new ProjectData(
					proj.getId(),
					proj.getName(),
					proj.getOrg().getSlug(),
					proj.getCreatedBy().getUsername(),
					proj.getStatus()
				);
	}
}
