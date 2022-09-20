package com.alba.depositreminder.controller;

import com.alba.depositreminder.dto.DepositDto;
import com.alba.depositreminder.mapper.DepositMapper;
import com.alba.depositreminder.model.Contribution;
import com.alba.depositreminder.model.Deposit;
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
  private final ContributionService contributionService;
  private final DepositMapper depositMapper;

  @GetMapping
  public List<DepositDto> getAllWithBanks() {
    return depositMapper.toDtoList(depositService.getAllWithBanks());
  }

  @PostMapping
  public void addNew(@RequestBody @Valid DepositDto depositDto) {
    Deposit savedDeposit = depositService.save(depositMapper.toEntity(depositDto));
    contributionService.save(
        Contribution.builder()
            .date(depositDto.getOpenDate())
            .sum(depositDto.getSum())
            .deposit(savedDeposit)
            .build());
  }

  @PutMapping("/{id}")
  public void update(@PathVariable int id, @RequestBody @Valid DepositDto depositDto) {
    Deposit deposit = depositMapper.toEntity(depositDto);
    deposit.setId(id);
    depositService.save(deposit);
  }

  @DeleteMapping("/{id}")
  public void delete(@PathVariable int id) {
    depositService.delete(id);
  }

}
