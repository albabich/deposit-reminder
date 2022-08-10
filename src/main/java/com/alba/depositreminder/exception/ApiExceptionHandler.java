package com.alba.depositreminder.exception;

import static java.time.ZonedDateTime.now;

import java.time.ZoneId;
import java.util.HashMap;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class ApiExceptionHandler {

  @ExceptionHandler(value = {ApiRequestException.class})
  public ResponseEntity<Object> handleApiRequestException(ApiRequestException e) {
    HttpStatus badRequest = HttpStatus.BAD_REQUEST;

    ApiException apiException = new ApiException(
        e.getMessage(),
        badRequest,
        now(ZoneId.systemDefault())
    );
    return new ResponseEntity<>(apiException, badRequest);
  }

//  @ResponseStatus(HttpStatus.BAD_REQUEST)
//  @ExceptionHandler(MethodArgumentNotValidException.class)
//  public Map<String, String> handleValidationExceptions(
//      MethodArgumentNotValidException ex) {
//    Map<String, String> errors = new HashMap<>();
//    ex.getBindingResult().getAllErrors().forEach((error) -> {
//      String fieldName = ((FieldError) error).getField();
//      String errorMessage = error.getDefaultMessage();
//      errors.put(fieldName, errorMessage);
//    });
//    return errors;
//  }
}
