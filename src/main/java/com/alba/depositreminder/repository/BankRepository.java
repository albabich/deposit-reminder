package com.alba.depositreminder.repository;

import com.alba.depositreminder.model.Bank;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BankRepository extends JpaRepository<Bank, Integer> {

  Optional<Bank> getByName(String bankName);

}
