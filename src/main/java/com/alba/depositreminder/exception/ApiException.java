package com.alba.depositreminder.exception;

import java.time.ZonedDateTime;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@RequiredArgsConstructor
@Data
public class ApiException {

  private final String message;
  private final HttpStatus httpStatus;
  private final ZonedDateTime timestamp;

}
