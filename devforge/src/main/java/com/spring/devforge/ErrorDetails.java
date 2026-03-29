package com.spring.devforge;

import java.time.LocalDateTime;

public class ErrorDetails {
	private LocalDateTime timestamp;
	private String msg;
	private String details;
	public ErrorDetails(LocalDateTime timestamp, String msg, String details) {
		super();
		this.timestamp = timestamp;
		this.msg = msg;
		this.details = details;
	}
	public LocalDateTime getTimestamp() {
		return timestamp;
	}
	public String getMsg() {
		return msg;
	}
	public String getDetails() {
		return details;
	}
	
	
	
}
