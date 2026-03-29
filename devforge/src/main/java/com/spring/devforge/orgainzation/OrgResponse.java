package com.spring.devforge.orgainzation;

public class OrgResponse {
	String slug;
	String message;
	
	public String getSlug() {
		return slug;
	}
	public String getMessage() {
		return message;
	}
	public OrgResponse(String slug, String message) {
		super();
		this.slug = slug;
		this.message = message;
	}
}
