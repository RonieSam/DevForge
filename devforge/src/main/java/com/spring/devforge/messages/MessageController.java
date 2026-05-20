package com.spring.devforge.messages;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.spring.devforge.ApiResponse;

@Controller
public class MessageController {

	
	
	
	@Autowired
	MessageService service;
	
	@MessageMapping("/projects/{projId}")
	public void getMessage(@Payload MessageDTO msg,@DestinationVariable long projId) {
		service.createMessage(msg.getContent(),msg.getSender(),projId);

	}
	
	@GetMapping("/projects/{projId}/messages")
	public ResponseEntity<ApiResponse> getMessage(@PathVariable long projId) {
		List<MessageData> messages=service.getMessages(projId);
		return new ResponseEntity<>(new ApiResponse(true,"",messages),HttpStatus.OK);
	}
}
