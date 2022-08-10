package com.alba.depositreminder.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import java.time.LocalDate;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Data
@RequiredArgsConstructor
//@NoArgsConstructor
@Entity
@Table(name = "contribution")
public class Contribution {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  @Column(name = "date")
  private LocalDate date;

  @Column(name = "sum")
  private double sum;

  @ManyToOne(fetch = FetchType.LAZY)
//  @JsonBackReference
//  @OnDelete(action = OnDeleteAction.CASCADE)
  @JoinColumn(name = "deposit_id", nullable = false)
  private Deposit deposit;

  public Contribution(LocalDate date, double sum, Deposit deposit) {
    this.date = date;
    this.sum = sum;
    this.deposit = deposit;
  }
}
