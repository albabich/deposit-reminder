package com.alba.depositreminder.dto;

import java.time.LocalDate;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
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

  @Min(0)
  private Double sum;

  private Integer depositId;
}
