package com.spring.devforge.messages;

public class MessageMapper {
	static MessageData mapper(Message msg) {
		return new MessageData(msg.getContent(),msg.getSender().getUsername());
	}
}
