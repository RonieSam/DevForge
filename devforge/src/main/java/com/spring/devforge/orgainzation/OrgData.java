package com.spring.devforge.orgainzation;

public class OrgData {
	String slug;
	String name;
	long id;
	String owner;
	public String getSlug() {
		return slug;
	}
	public String getName() {
		return name;
	}
	public long getId() {
		return id;
	}
	public String getOwner() {
		return owner;
	}
	public OrgData(String slug, String name, long id, String owner) {
		super();
		this.slug = slug;
		this.name = name;
		this.id = id;
		this.owner = owner;
	}
	
	
	
}
