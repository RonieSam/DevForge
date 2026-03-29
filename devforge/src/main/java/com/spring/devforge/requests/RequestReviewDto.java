package com.spring.devforge.requests;

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

