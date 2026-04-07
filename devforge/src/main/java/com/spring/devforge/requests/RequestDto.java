package com.spring.devforge.requests;

public class RequestDto {
	String slug;
	String msg;
	public String getSlug() {
		return slug;
	}
	public void setSlug(String slug) {
		this.slug = slug;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
	public RequestDto(String slug, String msg) {
		super();
		this.slug = slug;
		this.msg = msg;
	}
	
}
