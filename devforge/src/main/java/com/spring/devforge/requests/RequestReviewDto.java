package com.spring.devforge.requests;

import jakarta.validation.constraints.NotNull;

public class RequestReviewDto {
	
		Status status;
		
		public RequestReviewDto(Status status) {
			super();
			this.status=status;
		}
		
		public Status getStatus() {
			return status;
		}
		
		
}

