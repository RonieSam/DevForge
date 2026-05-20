package com.spring.devforge.requests;



public class RequestData {
	long id;
	String username;
	RequestStatus status;
	String msg;
	public String getUsername() {
		return username;
	}
	public String getMsg() {
		return msg;
	}
	public RequestStatus getStatus() {
		return status;
	}
	

	
	public long getId() {
		return id;
	}
	public RequestData(long id,String username, RequestStatus status,String msg) {
		super();
		this.id=id;
		this.username = username;
		this.status = status;
		this.msg=msg;
	}
	
	
	
}
