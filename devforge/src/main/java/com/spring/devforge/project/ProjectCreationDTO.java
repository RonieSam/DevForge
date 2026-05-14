package com.spring.devforge.project;

import java.util.List;

public class ProjectCreationDTO {
	String name;
	String desc;
	List<String> stack;
	String github;
	
	public ProjectCreationDTO(String name,String desc,List<String>stack,String github){
		this.name=name;
		this.desc=desc;
		this.stack=stack;
		this.github=github;
	}
	
	public ProjectCreationDTO() {}
	public String getDesc() {
		return desc;
	}

	public List<String> getStack() {
		return stack;
	}

	public String getGithub() {
		return github;
	}

	public String getName() {
		return name;
	}
}
