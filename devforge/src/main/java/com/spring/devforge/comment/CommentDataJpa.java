package com.spring.devforge.comment;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.spring.devforge.task.Tasks;

public interface CommentDataJpa extends JpaRepository<Comments, Long>{
	public List<Comments> findAllByTaskId(long taskId);
	
}
