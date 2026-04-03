package com.spring.devforge.project;




public class ProjectData {
	long id;
	String name;
	String slug;
	String creater;
	ProjectStatus status;
	public ProjectData(long id, String name, String slug, String creater, ProjectStatus status) {
		super();
		this.id = id;
		this.name = name;
		this.slug = slug;
		this.creater = creater;
		this.status = status;
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
	public ProjectStatus getStatus() {
		return status;
	}
	
	
}
