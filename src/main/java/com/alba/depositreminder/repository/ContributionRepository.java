package com.alba.depositreminder.repository;

import com.alba.depositreminder.model.Contribution;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContributionRepository extends JpaRepository<Contribution, Integer> {

  List<Contribution> getAllByDepositId(int id);
}
