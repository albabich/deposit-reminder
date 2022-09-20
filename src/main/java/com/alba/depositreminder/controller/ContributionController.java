package com.alba.depositreminder.controller;

import com.alba.depositreminder.dto.ContributionDto;
import com.alba.depositreminder.mapper.ContributionMapper;
import com.alba.depositreminder.model.Contribution;
import com.alba.depositreminder.service.ContributionService;
import javax.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/contributions")
public class ContributionController {

  private final ContributionService contributionService;
  private final ContributionMapper mapper;

  @PostMapping()
  public void addNew(@RequestBody @Valid ContributionDto contributionDto) {
    contributionService.save(mapper.toContribution(contributionDto));
  }

  @PutMapping("/{id}")
  public void update(@PathVariable int id, @RequestBody @Valid ContributionDto contributionDto) {
    Contribution contribution = contributionService.getById(id);
    contribution.setDate(contributionDto.getDate());
    contribution.setSum(contributionDto.getSum());
    contributionService.save(contribution);
  }

  @DeleteMapping("/{id}")
  public void delete(@PathVariable int id) {
    contributionService.delete(id);
  }

}
