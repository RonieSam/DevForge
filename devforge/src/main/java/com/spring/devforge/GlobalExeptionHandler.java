package com.spring.devforge;

import java.nio.file.AccessDeniedException;

import javax.naming.AuthenticationException;

import org.apache.coyote.BadRequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.ConstraintViolationException;

@RestControllerAdvice
public class GlobalExeptionHandler {

	
	@ExceptionHandler(ConstraintViolationException.class)
	public ResponseEntity <ApiResponse> handleConstraintViolationtException(ConstraintViolationException ex) {
		String msg=ex.getConstraintViolations().iterator().next().getMessage();
		return new ResponseEntity<>(new ApiResponse(false,msg,null),HttpStatus.CONFLICT);
	}
	
	@ExceptionHandler(AuthenticationException.class)
	public ResponseEntity<ApiResponse> handleAuthenticationException(AuthenticationException ex){
		return new ResponseEntity<>(new ApiResponse(false,ex.getMessage(),null),HttpStatus.UNAUTHORIZED);

	}
	
	@ExceptionHandler(AccessDeniedException.class)
	public ResponseEntity<ApiResponse> handleAccessDeniedException(AccessDeniedException ex){
		return new ResponseEntity<>(new ApiResponse(false,ex.getMessage(),null),HttpStatus.FORBIDDEN);

	}
	
	@ExceptionHandler(EntityNotFoundException.class)
	public ResponseEntity<ApiResponse> handleEntityNotFoundException(EntityNotFoundException ex){
		return new ResponseEntity<>(new ApiResponse(false,ex.getMessage(),null),HttpStatus.NOT_FOUND);
	}
	
	
	@ExceptionHandler(BadRequestException.class)
	public ResponseEntity<ApiResponse> handleBadRequestException(BadRequestException ex){
		return new ResponseEntity<>(new ApiResponse(false,ex.getMessage(),null),HttpStatus.BAD_REQUEST);
	}
	@ExceptionHandler(IllegalArgumentException.class)
	public ResponseEntity<Object> handleIllegalArgumentException(IllegalArgumentException ex){
		return new ResponseEntity<>(new ApiResponse(false,ex.getMessage(),null),HttpStatus.CONFLICT);
	}
	@ExceptionHandler(Exception.class)
	public ResponseEntity<Object> handleAllException(Exception ex){
		return new ResponseEntity<>(new ApiResponse(false,ex.getMessage(),null),HttpStatus.BAD_REQUEST);
	}
}
