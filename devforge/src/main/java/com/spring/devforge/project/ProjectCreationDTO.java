package com.spring.devforge.project;

public class ProjectCreationDTO {
	String name;
	ProjectCreationDTO(String name){
		this.name=name;
	}
	
	public String getName() {
		return name;
	}
}
