package com.spring.devforge;

public class ApiResponse {
	String msg;
	Object data;
	boolean success;
	public String getMsg() {
		return msg;
	}
	public Object getData() {
		return data;
	}
	
	public boolean getSuccess() {
		return success;
	}
	public ApiResponse(boolean success,String msg, Object data) {
		super();
		this.msg = msg;
		this.data = data;
		this.success=success;
	}
	
}
