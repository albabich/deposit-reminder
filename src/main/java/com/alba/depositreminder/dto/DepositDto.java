package com.alba.depositreminder.dto;

import com.alba.depositreminder.model.Contribution;
import java.time.LocalDate;
import java.util.List;
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
public class DepositDto {

  private Integer id;
  @NotBlank
  private String name;
  @NotNull
  private LocalDate openDate;

  private LocalDate closeDate;

  private Integer durationDays;
  @Min(0)
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
