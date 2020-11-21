package com.jd.exception;


import java.util.Date;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class CustomResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {
	
	@ExceptionHandler(Exception.class)
    public final ResponseEntity<Object> handleAllExceptions(Exception ex, WebRequest req) {
        
        ExceptionResponse expResp = new ExceptionResponse(new Date(),ex.getMessage(),"Not found");
        return new ResponseEntity(expResp,HttpStatus.INTERNAL_SERVER_ERROR);
    }
	
	@ExceptionHandler({UserNotFoundException.class})
    public final ResponseEntity<Object> handleUserNotFoundException(UserNotFoundException ex,WebRequest req) {
        
        ExceptionResponse expResp = new ExceptionResponse(new Date(),ex.getMessage(),"Not found");
        return new ResponseEntity(expResp,HttpStatus.NOT_FOUND);
    }
	
	@Override
	protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
			HttpHeaders headers, HttpStatus status, WebRequest request) {
		
		ExceptionResponse expRes = new ExceptionResponse(new Date(),"Validation Failed",ex.getBindingResult().toString());
		return new ResponseEntity(expRes,HttpStatus.BAD_REQUEST);
		
	}

}
