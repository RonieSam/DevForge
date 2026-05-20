package com.spring.devforge.messages;

public class MessageData {
	String content;
	String sender;
	public String getContent() {
		return content;
	}
	public String getSender() {
		return sender;
	}
	public MessageData(String content, String sender) {
		super();
		this.content = content;
		this.sender = sender;
	}
	
	
}
