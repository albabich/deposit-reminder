package com.alba.depositreminder.mapper;

import static com.alba.depositreminder.util.DepositUtil.addCapitalization;

import com.alba.depositreminder.dto.DepositDto;
import com.alba.depositreminder.model.Bank;
import com.alba.depositreminder.model.Contribution;
import com.alba.depositreminder.model.Deposit;
import com.alba.depositreminder.service.BankService;
import com.alba.depositreminder.service.ContributionService;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.Named;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(componentModel = "spring")
public abstract class DepositMapper {

  @Autowired
  protected BankService bankService;
  @Autowired
  protected ContributionService contributionService;
  @Autowired
  protected ContributionMapper contributionMapper;

  public DepositDto toDto(Deposit deposit, List<Contribution> contributions) {
    List<Contribution> depositContributions = contributions.stream()
        .filter(c -> c.getDeposit().equals(deposit))
        .toList();

    List<Contribution> contributionsWithPayments = addCapitalization(
        depositContributions,
        deposit).stream()
        .sorted(Comparator.comparing(Contribution::getDate))
        .toList();

    double sumContributions = depositContributions.stream().mapToDouble(Contribution::getSum).sum();
    double sumTotal = contributionsWithPayments.stream().mapToDouble(Contribution::getSum).sum();
    return DepositDto.builder()
        .id(deposit.getId())
        .name(deposit.getName())
        .openDate(deposit.getOpenDate())
        .closeDate(deposit.getCloseDate())
        .durationDays((int) ChronoUnit.DAYS.between(deposit.getOpenDate(), deposit.getCloseDate()))
        .sum(sumContributions)
        .yearPercent(deposit.getYearPercent())
        .percentageType(deposit.getPercentageType().name())
        .capitalization(deposit.isCapitalization())
        .bankName(deposit.getBank().getName())
        .profit(sumTotal)
        .contributionList(contributionMapper.toDtoList(contributionsWithPayments))
        .build();
  }

  @Mappings({
      @Mapping(target = "bank", source = "dto.bankName", qualifiedByName = "mapBankFromBankName")
  })
  public abstract Deposit toEntity(DepositDto dto);

  public List<DepositDto> toDtoList(List<Deposit> deposits) {
    if (deposits == null) {
      return null;
    }

    List<Contribution> all = contributionService.getAll();
    List<DepositDto> list = new ArrayList<DepositDto>(deposits.size());
    for (Deposit deposit : deposits) {
      list.add(toDto(deposit, all));
    }

    return list;
  }

  @Named("mapBankFromBankName")
  protected Bank mapBankFromBankName(String bankName) {
    return bankService.getByNameOrAddNew(bankName);
  }

}
