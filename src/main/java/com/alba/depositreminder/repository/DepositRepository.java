package com.alba.depositreminder.repository;

import com.alba.depositreminder.dto.DepositDto;
import com.alba.depositreminder.model.Deposit;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface DepositRepository extends JpaRepository <Deposit, Integer> {
@Query("SELECT d FROM Deposit d JOIN FETCH d.bank b")
  List<Deposit> findAllWithBanks();
}
