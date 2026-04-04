package com.spring.devforge;

public class ApiResponse {
	String message;
	Object data;
	boolean success;
	public String getMessage() {
		return message;
	}
	public Object getData() {
		return data;
	}
	
	public boolean getSuccess() {
		return success;
	}
	public ApiResponse(boolean success,String msg, Object data) {
		super();
		this.message = msg;
		this.data = data;
		this.success=success;
	}
	
}
