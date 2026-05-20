package com.spring.devforge.messages;

public class MessageDTO {
	String content;
	String sender;

	public String getContent() {
		return content;
	}

	public String getSender() {
		return sender;
	}
	

	public MessageDTO(String content,String sender) {
		super();
		this.content = content;
		this.sender=sender;
	}
	
	MessageDTO(){}
}
