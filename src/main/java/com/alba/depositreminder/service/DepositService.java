package com.alba.depositreminder.service;

import com.alba.depositreminder.exception.ApiRequestException;
import com.alba.depositreminder.model.Deposit;
import com.alba.depositreminder.repository.DepositRepository;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DepositService {

  private final DepositRepository depositRepository;

  public List<Deposit> getAll() {
//    throw new ApiRequestException("Cannot get all Depos");
    return depositRepository.findAll();
  }

  public List<Deposit> getAllWithBanks() {
//    throw new ApiRequestException("Cannot get all Depos");
    return depositRepository.findAllWithBanks();
  }

  @Transactional
  public Deposit save(Deposit deposit) {
    return depositRepository.save(deposit);
  }

  @Transactional
  public void delete(int id) {
    depositRepository.deleteById(id);
  }

  public Deposit getById(Integer id) {
    Optional<Deposit> optionalDeposit = depositRepository.findById(id);
    return optionalDeposit.orElseThrow(
        () -> new ApiRequestException("Deposit %d not exist".formatted(id)));
  }
}
