package com.alba.depositreminder.controller;

import static com.alba.depositreminder.util.DepositUtil.convertToDeposit;
import static com.alba.depositreminder.util.DepositUtil.convertToDtoList;

import com.alba.depositreminder.dto.DepositDto;
import com.alba.depositreminder.model.Bank;
import com.alba.depositreminder.model.Contribution;
import com.alba.depositreminder.model.Deposit;
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
    List<Contribution> contributions = contributionService.getAll();
    return convertToDtoList(depositService.getAllWithBanks(), contributions);
  }

  @PostMapping
  public void addNew(@RequestBody @Valid DepositDto depositDto) {
    Bank bank = bankService.getByNameOrAddNew(depositDto.getBankName());
    Deposit savedDeposit = depositService.save(convertToDeposit(depositDto, bank));
    contributionService.save(
        new Contribution(depositDto.getOpenDate(), depositDto.getSum(), savedDeposit));
  }

  @PutMapping("/{id}")
  public void update(@PathVariable int id, @RequestBody @Valid DepositDto depositDto) {
    Bank bank = bankService.getByNameOrAddNew(depositDto.getBankName());
    Deposit deposit = convertToDeposit(depositDto, bank);
    deposit.setId(id);
    depositService.save(deposit);
  }

  @DeleteMapping("/{id}")
  public void delete(@PathVariable int id) {
    depositService.delete(id);
  }

}
