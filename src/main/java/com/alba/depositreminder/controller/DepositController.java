package com.alba.depositreminder.controller;

import static com.alba.depositreminder.util.DepositUtil.computeProfit;

import com.alba.depositreminder.dto.DepositDto;
import com.alba.depositreminder.model.Contribution;
import com.alba.depositreminder.model.Deposit;
import com.alba.depositreminder.model.PercentageType;
import com.alba.depositreminder.service.BankService;
import com.alba.depositreminder.service.ContributionService;
import com.alba.depositreminder.service.DepositService;
import java.util.List;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/deposits")
@RequiredArgsConstructor
public class DepositController {

  private final DepositService depositService;
  private final BankService bankService;
  private final ContributionService contributionService;

  @GetMapping
  public List<DepositDto> getAllWithBanks() {
    return convertToDtoList(depositService.getAllWithBanks());
  }

  @PostMapping
  public void addNew(@RequestBody @Valid DepositDto depositDto) {
    Deposit savedDeposit = depositService.save(convertToDeposit(depositDto));
    contributionService.save(
        new Contribution(depositDto.getOpenDate(), depositDto.getSum(), savedDeposit));
  }

  @PutMapping("/{id}")
  public void update(@PathVariable int id, @RequestBody @Valid DepositDto depositDto) {
    Deposit deposit = convertToDeposit(depositDto);
    deposit.setId(id);
    depositService.save(deposit);
  }

  @DeleteMapping("/{id}")
  public void delete(@PathVariable int id) {
    depositService.delete(id);
  }

  private Deposit convertToDeposit(DepositDto depositDto) {
    return new Deposit(
        depositDto.getName(),
        depositDto.getOpenDate(),
        depositDto.getDurationDays(),
        depositDto.getSum(),
        depositDto.getYearPercent(),
        PercentageType.valueOf(depositDto.getPercentageType()),
        bankService.getByNameOrAddNew(depositDto.getBankName())
    );
  }


  private List<DepositDto> convertToDtoList(List<Deposit> depositList) {
    return depositList.stream()
        .map(this::convertToDto)
        .toList();
  }

  private DepositDto convertToDto(Deposit deposit) {
    List<Contribution> contributions = contributionService.getAllByDeposit(deposit.getId());
    return DepositDto.builder()
        .id(deposit.getId())
        .name(deposit.getName())
        .openDate(deposit.getOpenDate())
        .closeDate(deposit.getOpenDate().plusDays(deposit.getDaysNumber()))
        .durationDays(deposit.getDaysNumber())
        .sum(contributions.stream().mapToDouble(Contribution::getSum).sum())
        .yearPercent(deposit.getYearPercent())
        .percentageType(deposit.getPercentageType().name())
        .bankName(deposit.getBank().getName())
        .profit(Math.round(computeProfit(deposit, contributions) * 100 / 100.0))
        .contributionList(contributions)
        .build();
  }
}
