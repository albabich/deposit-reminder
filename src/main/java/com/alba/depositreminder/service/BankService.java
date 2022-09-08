package com.alba.depositreminder.service;

import com.alba.depositreminder.model.Bank;
import com.alba.depositreminder.repository.BankRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BankService {

  private final BankRepository bankRepository;

  @Transactional
  public Bank getByNameOrAddNew(String bankName) {
    Optional<Bank> optionalBank = bankRepository.getByName(bankName);
    return optionalBank.orElseGet(() -> create(bankName));
  }

  @Transactional
  public Bank create(String bankName) {
    return bankRepository.save(new Bank(bankName));
  }
}
