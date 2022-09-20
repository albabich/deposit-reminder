package com.alba.depositreminder.exception;

import static java.time.ZonedDateTime.now;

import java.time.ZoneId;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

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

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<Object> handleValidationExceptions(
      MethodArgumentNotValidException ex) {
    StringBuilder sb = new StringBuilder();
    ex.getBindingResult().getAllErrors().forEach((error) -> {
      sb.append(((FieldError) error).getField()).append(" ")
          .append(error.getDefaultMessage())
          .append("; ");
    });
    ApiException apiException = new ApiException(
        sb.toString(),
        HttpStatus.BAD_REQUEST,
        now(ZoneId.systemDefault())
    );

    return new ResponseEntity<>(apiException, HttpStatus.BAD_REQUEST);
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
