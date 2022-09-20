package com.alba.depositreminder.dto;

import java.time.LocalDate;
import java.util.List;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
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
public class DepositDto {

  private Integer id;
  @NotBlank
  private String name;
  @NotNull
  private LocalDate openDate;
  @NotNull
  private LocalDate closeDate;

  private Integer durationDays;
  @Positive
  private double sum;
  @Min(0)
  private double yearPercent;
  @NotNull
  private String percentageType;
  @NotNull
  private boolean capitalization;

  private List<ContributionDto> contributionList;
  @NotBlank
  private String bankName;

  private double profit;
}
