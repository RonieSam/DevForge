package com.spring.devforge.project;

public class ProjectInfo {
	long id;
	String name;
	String slug;
	public ProjectInfo(long id, String name, String slug) {
		super();
		this.id = id;
		this.name = name;
		this.slug = slug;
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
	
	public ProjectInfo() {}
}
