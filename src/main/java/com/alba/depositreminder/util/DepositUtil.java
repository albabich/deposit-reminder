package com.alba.depositreminder.util;

import com.alba.depositreminder.model.Contribution;
import com.alba.depositreminder.model.Deposit;
import com.alba.depositreminder.model.PercentageType;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import lombok.experimental.UtilityClass;

@UtilityClass
public class DepositUtil {

  public static List<Contribution> addCapitalization(List<Contribution> contributions,
      Deposit deposit) {
    int daysInYear = deposit.getOpenDate().lengthOfYear();
    double percentForDay = deposit.getYearPercent() / daysInYear;
    List<DatePeriod> periods = depositPaymentPeriods(deposit);

    List<Contribution> contributionsWithCapitalization = new ArrayList<>(contributions);
    for (DatePeriod period : periods) {
      Map<LocalDate, Double> contributionsWithCapMap = getBalanceMap(deposit,
          contributionsWithCapitalization);
      LocalDate periodEnd = period.getEnd();
      double capitalization = computePercentSumForPeriod(contributionsWithCapMap,
          period.getStart(),
          periodEnd,
          percentForDay);
      LocalDate capitalizationDate =
          periodEnd.plusDays(1).isAfter(deposit.getCloseDate()) ? deposit.getCloseDate()
              : periodEnd.plusDays(1);
      contributionsWithCapitalization.add(
          Contribution.builder()
              .date(capitalizationDate)
              .sum(Math.round(capitalization * 100) / 100.0)
              .deposit(deposit)
              .build());
    }
    return contributionsWithCapitalization;
  }

  private static List<DatePeriod> depositPaymentPeriods(Deposit deposit) {
    LocalDate depositStart = deposit.getOpenDate();
    LocalDate depositEnd = deposit.getCloseDate();
    PercentageType percentageType = deposit.getPercentageType();
    List<DatePeriod> periods = new ArrayList<>();

    if (percentageType.equals(PercentageType.AT_THE_END)) {
      periods.add(new DatePeriod(depositStart, depositEnd));
      return periods;
    }

    LocalDate firstPeriodEnd = getPeriodEnd(depositStart, depositEnd, percentageType);
    periods.add(new DatePeriod(depositStart, firstPeriodEnd));
    LocalDate nextPeriodStart = firstPeriodEnd.plusDays(1);
    while (nextPeriodStart.isBefore(depositEnd)) {
      LocalDate periodEnd = getPeriodEnd(nextPeriodStart, depositEnd, percentageType);
      periods.add(new DatePeriod(nextPeriodStart, periodEnd));
      nextPeriodStart = periodEnd.plusDays(1);
    }
    return periods;
  }


  private static LocalDate getPeriodEnd(LocalDate periodStart, LocalDate depositEnd,
      PercentageType percentageType) {

    if (percentageType.equals(PercentageType.MONTHLY)) {

      LocalDate lastDayOfMonth = periodStart.withDayOfMonth(periodStart.lengthOfMonth());
      return lastDayOfMonth.isAfter(depositEnd) ? depositEnd : lastDayOfMonth;
    }
    if (percentageType.equals(PercentageType.MONTHLY_ON_DEPOSIT_DAY)) {

      LocalDate lastDayOfPeriod = periodStart.plusMonths(1).minusDays(1);
      return lastDayOfPeriod.isAfter(depositEnd) ? depositEnd : lastDayOfPeriod;
    }
    return null;
  }


  private static Double computePercentSumForPeriod(Map<LocalDate, Double> map, LocalDate from,
      LocalDate to, double percentForDay) {
    double sum = map.entrySet().stream()
        .filter(e -> e.getKey().isAfter(from.minusDays(1)) && e.getKey().isBefore(to.plusDays(1)))
        .mapToDouble(e -> (e.getValue() * percentForDay / 100.0))
        .sum();
    return Math.round(sum * 100) / 100.0;
  }

  private static Map<LocalDate, Double> getBalanceMap(Deposit deposit,
      List<Contribution> contributions) {
    Map<LocalDate, Double> dayBalances = new TreeMap<>();
    LocalDate start = deposit.getOpenDate();
    LocalDate end = deposit.getCloseDate();
    for (LocalDate date = start; date.isBefore(end); date = date.plusDays(1)) {
      LocalDate finalDate = date;
      double balanceOnDate = contributions.stream()
          .filter(c -> c.getDate().isBefore(finalDate.plusDays(1)))
          .mapToDouble(Contribution::getSum)
          .sum();
      dayBalances.put(date, balanceOnDate);
    }
    return dayBalances;
  }

}
