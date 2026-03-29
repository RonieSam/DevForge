package com.spring.devforge.authentication;

public class AuthResponse {
	
	private String msg;
	private String jwtToken;
	
	public AuthResponse(String msg, String jwtToken) {
		super();
		this.msg = msg;
		this.jwtToken = jwtToken;
	}
	public AuthResponse(String msg) {
		super();
		this.msg = msg;
		this.jwtToken = "";
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
	public String getJwtToken() {
		return jwtToken;
	}
	public void setJwtToken(String jwtToken) {
		this.jwtToken = jwtToken;
	}
	
}
