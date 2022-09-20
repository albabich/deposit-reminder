package com.alba.depositreminder.dto;

import java.time.LocalDate;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class ContributionDto {

  private Integer id;

  @NotNull
  private LocalDate date;

  @Positive
  @NotNull
  private Double sum;

  @NotNull
  private Integer depositId;
}
