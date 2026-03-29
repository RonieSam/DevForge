package com.spring.devforge.task;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TaskService {

	
	@GetMapping("/")
	public String handleTest() {
		return "Successful";
	}
	
}
