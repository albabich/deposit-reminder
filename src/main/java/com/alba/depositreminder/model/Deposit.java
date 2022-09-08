package com.alba.depositreminder.model;

import java.time.LocalDate;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@Data
@Entity
@Table(name = "deposit")
public class Deposit {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private int id;

  @Column(name = "name")
  private String name;

  @Column(name = "open_date")
  private LocalDate openDate;

  @Column(name = "close_date")
  private LocalDate closeDate;

  @Column(name = "initial_sum")
  private double initialSum;

  @Column(name = "year_percent")
  private double yearPercent;

  @Enumerated(EnumType.STRING)
  @Column(name = "percentage_type")
  private PercentageType percentageType;

  @Column(name = "capitalization")
  private boolean capitalization;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "bank_id", nullable = false)
  @ToString.Exclude
  private Bank bank;

  public Deposit(String name, LocalDate openDate, LocalDate closeDate, double initialSum,
      double yearPercent, PercentageType percentageType, boolean capitalization, Bank bank) {
    this.name = name;
    this.openDate = openDate;
    this.closeDate = closeDate;
    this.initialSum = initialSum;
    this.yearPercent = yearPercent;
    this.percentageType = percentageType;
    this.capitalization = capitalization;
    this.bank = bank;
  }
}
