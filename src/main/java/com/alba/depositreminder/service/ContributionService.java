package com.alba.depositreminder.service;

import com.alba.depositreminder.model.Contribution;
import com.alba.depositreminder.repository.ContributionRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ContributionService {

  private final ContributionRepository contributionRepository;

  public List<Contribution> getAllByDeposit(int id) {
    return contributionRepository.getAllByDepositId(id);
  }

  public void save(Contribution contribution) {
    contributionRepository.save(contribution);
  }

  public void delete(int id) {
    contributionRepository.deleteById(id);
  }

  public Contribution getById(int id) {
    return contributionRepository.getReferenceById(id);
  }

  public List<Contribution> getAll() {
    return contributionRepository.findAll();
  }
}
