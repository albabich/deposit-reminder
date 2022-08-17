package com.alba.depositreminder.util;

import com.alba.depositreminder.dto.ContributionDto;
import com.alba.depositreminder.model.Contribution;
import java.util.Comparator;
import java.util.List;
import lombok.experimental.UtilityClass;

@UtilityClass
public class ContributionUtil {

  public static List<ContributionDto> convertToDtoList(List<Contribution> contributions) {
    return contributions.stream()
        .map(ContributionUtil::convertToDto)
        .sorted(Comparator.comparing(ContributionDto::getDate))
        .toList();
  }

  public static ContributionDto convertToDto(Contribution contribution) {
    return ContributionDto.builder()
        .id(contribution.getId())
        .date(contribution.getDate())
        .sum(contribution.getSum())
        .depositId(contribution.getDeposit().getId())
        .build();
  }
}
