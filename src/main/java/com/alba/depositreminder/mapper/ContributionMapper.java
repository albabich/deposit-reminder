package com.alba.depositreminder.mapper;

import com.alba.depositreminder.dto.ContributionDto;
import com.alba.depositreminder.model.Contribution;
import com.alba.depositreminder.model.Deposit;
import com.alba.depositreminder.service.DepositService;
import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.Named;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(componentModel = "spring")
public abstract class ContributionMapper {

  @Autowired
  protected DepositService depositService;

  public abstract ContributionDto toDto(Contribution contribution);

  public abstract List<ContributionDto> toDtoList(List<Contribution> contributions);

  @Mappings({
      @Mapping(target = "deposit", source = "dto.depositId", qualifiedByName = "mapDepositFromDepositId")
  })
  public abstract Contribution toContribution(ContributionDto dto);

  @Named("mapDepositFromDepositId")
  protected Deposit mapDepositFromDepositId(Integer depositId) {
    return depositService.getById(depositId);
  }
}
