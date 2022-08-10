package com.alba.depositreminder.util;

import com.alba.depositreminder.model.Contribution;
import com.alba.depositreminder.model.Deposit;
import com.alba.depositreminder.model.PercentageType;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

public class DepositUtil {
  public static double computeProfit(Deposit deposit, List<Contribution> contributions) {
    int daysInYear = deposit.getOpenDate().lengthOfYear();
    double percentForDay = deposit.getYearPercent() / daysInYear;
//    List<Contribution> contributions = contributionService.getAllByDeposit(deposit.getId());

    Map<LocalDate, Double> map = getBalanceMap(deposit, contributions);
    System.out.println(map);
    LocalDate depositStart = deposit.getOpenDate();
    LocalDate depositEnd = depositStart.plusDays(deposit.getDaysNumber());

    PercentageType percentageType = deposit.getPercentageType();
    return switch (percentageType) {
      case AT_THE_END -> computePercentSumForPeriod(map, depositStart, depositEnd, percentForDay);
      case YEARLY -> 0.0;
      case SEMIANNUALLY -> 0.0;
      case QUARTERLY -> 0.0;
      case MONTHLY -> computePercentSumMonthly(contributions, deposit, percentForDay);
      case DAILY -> 0.0;
    };
  }

  private static double computePercentSumMonthly(List<Contribution> contributions, Deposit deposit,
      double percentForDay) {
    List<DatePeriod> periods = depositPeriods(deposit);

    List<Contribution> contributionsWithCapitalization = addCapitalization(
        contributions, deposit, percentForDay, periods);
    return contributionsWithCapitalization.stream()
        .mapToDouble(Contribution::getSum)
        .sum();
  }

  private static List<Contribution> addCapitalization(List<Contribution> contributions,
      Deposit deposit,
      double percentForDay, List<DatePeriod> periods) {
    List<Contribution> contributionsWithCapitalization = new ArrayList<>(contributions);
    for (DatePeriod period : periods) {
      Map<LocalDate, Double> contributionsWithCapMap = getBalanceMap(deposit,
          contributionsWithCapitalization);
      double capitalization = computePercentSumForPeriod(contributionsWithCapMap,
          period.getStart(),
          period.getEnd(),
          percentForDay);
      contributionsWithCapitalization.add(
          new Contribution(period.getEnd().plusDays(1), capitalization, deposit));
    }
    return contributionsWithCapitalization;
  }

  private static List<DatePeriod> depositPeriods(Deposit deposit) {
    LocalDate depositStart = deposit.getOpenDate();
    LocalDate depositEnd = depositStart.plusDays(deposit.getDaysNumber());
    List<DatePeriod> periods = new ArrayList<>();
    LocalDate lastDayOfFirstMonth = getLastDayOfMonth(depositStart);
    periods.add(new DatePeriod(depositStart, lastDayOfFirstMonth));
    LocalDate nextFirstDayOfMonth = lastDayOfFirstMonth.plusDays(1);
    while (nextFirstDayOfMonth.isBefore(depositEnd)) {
      periods.add(new DatePeriod(nextFirstDayOfMonth, getLastDayOfMonth(nextFirstDayOfMonth)));
      nextFirstDayOfMonth = nextFirstDayOfMonth.plusMonths(1);
    }
    if (depositEnd.getDayOfMonth() != 1) {
      periods.add(new DatePeriod(depositEnd.withDayOfMonth(1), depositEnd.minusDays(1)));
    }
    return periods;
  }

  private static LocalDate getLastDayOfMonth(LocalDate date) {
    return date.withDayOfMonth(date.lengthOfMonth());
  }

  private static Double computePercentSumForPeriod(Map<LocalDate, Double> map, LocalDate from,
      LocalDate to, double percentForDay) {
    return map.entrySet().stream()
        .filter(e -> e.getKey().isAfter(from.minusDays(1)) && e.getKey().isBefore(to.plusDays(1)))
        .mapToDouble(e -> (e.getValue() * percentForDay / 100.0))
        .sum();
  }


  private static Map<LocalDate, Double> getBalanceMap(Deposit deposit, List<Contribution> contributions) {
    Map<LocalDate, Double> balancesOfDays = new TreeMap<>();
    LocalDate start = deposit.getOpenDate();
    LocalDate end = start.plusDays(deposit.getDaysNumber());
    for (LocalDate date = start; date.isBefore(end); date = date.plusDays(1)) {
      LocalDate finalDate = date;
      double balanceOnDate = contributions.stream()
          .filter(c -> c.getDate().isBefore(finalDate.plusDays(1)))
          .mapToDouble(Contribution::getSum)
          .sum();
      balancesOfDays.put(date, balanceOnDate);
    }
    return balancesOfDays;
  }

}
