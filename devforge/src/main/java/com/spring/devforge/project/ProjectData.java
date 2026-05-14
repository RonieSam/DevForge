package com.spring.devforge.project;

import java.util.List;

import com.spring.devforge.logs.ProjectLogs;
import com.spring.devforge.task.TaskData;
import com.spring.devforge.task.Tasks;

public class ProjectData {
	long id;
	String name;
	String slug;
	String creater;
	String desc;
	List<String> stack;
	String github;
	List<String> logs;
	List<TaskData> tasks;
	public ProjectData(long id, String name, String slug, String creater,String desc,List<String> stack,String github,List<String> logs,List<TaskData> tasks) {
		super();
		this.id = id;
		this.name = name;
		this.slug = slug;
		this.creater = creater;
		this.desc=desc;
		this.stack=stack;
		this.github=github;
		this.tasks=tasks;
		this.logs=logs;
	}
	public List<String> getLogs() {
		return logs;
	}
	public List<TaskData> getTasks() {
		return tasks;
	}
	public String getDesc() {
		return desc;
	}
	public List<String> getStack() {
		return stack;
	}
	public String getGithub() {
		return github;
	}
	
	public long getId() {
		return id;
	}
	public String getName() {
		return name;
	}
	public String getSlug() {
		return slug;
	}
	public String getCreater() {
		return creater;
	}
	
	
	
}
