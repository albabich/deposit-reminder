package com.alba.depositreminder.util;

import java.time.LocalDate;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class DatePeriod {

  private final LocalDate start;
  private final LocalDate end;
}
