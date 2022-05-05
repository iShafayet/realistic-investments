export function calculateResults(input) {
  let {
    capitalAmount,
    inflationPercentage,
    periodicContribution,
    interest,
    wealthTax,
    years,
    suggestedPriceOfGoldPerGram,
  } = input;

  // normalize
  if (interest.enabled && interest.period === "monthly-12-y") {
    interest.percentage = interest.percentage / 12;
  }

  // normalize
  input.interestType = "none";
  if (interest.enabled) {
    input.interestType = interest.type;
  }

  let list = [];
  let currentCapital = capitalAmount;

  for (let y = 1; y <= years; y++) {
    let startingCapital = currentCapital;
    let totalInterestY = 0;
    let totalContributionY = 0;
    let totalWealthTaxY = 0;
    let totalInterestTaxY = 0;
    let endingCapital = 0;
    let inflationAdjustedEndingCapital = 0;

    // simulate months
    for (let m = 1; m <= 12; m++) {
      // contributions
      if (periodicContribution.enabled) {
        if (periodicContribution.period === "monthly-12-y") {
          let contribution = periodicContribution.amount;
          if (periodicContribution.type === "withdrawal") {
            contribution = contribution * -1;
          }
          totalContributionY += contribution;
          currentCapital += contribution;
        }
        if (periodicContribution.period === "quarterly-4-y" && m % 4 === 0) {
          let contribution = periodicContribution.amount;
          if (periodicContribution.type === "withdrawal") {
            contribution = contribution * -1;
          }
          totalContributionY += contribution;
          currentCapital += contribution;
        }
        if (periodicContribution.period === "yearly-1-y" && m % 12 === 0) {
          let contribution = periodicContribution.amount;
          if (periodicContribution.type === "withdrawal") {
            contribution = contribution * -1;
          }
          totalContributionY += contribution;
          currentCapital += contribution;
        }
      }

      if (interest.enabled) {
        // simple interests
        if (interest.type === "simple" && interest.period === "monthly-12-y") {
          let instantInterest = currentCapital * (interest.percentage / 100);
          totalInterestY += instantInterest;
        }
        if (interest.type === "simple" && interest.period === "yearly-1-y" && m % 12 === 0) {
          let instantInterest = currentCapital * (interest.percentage / 100);
          totalInterestY += instantInterest;
        }

        // compounding interests
        if (interest.type === "compounding" && interest.period === "monthly-12-y") {
          let instantInterest = currentCapital * (interest.percentage / 100);
          totalInterestY += instantInterest;
          currentCapital += instantInterest;
        }
        if (interest.type === "compounding" && interest.period === "yearly-1-y" && m % 12 === 0) {
          let instantInterest = currentCapital * (interest.percentage / 100);
          totalInterestY += instantInterest;
          currentCapital += instantInterest;
        }
      }
    }

    // total tax on interest
    if (interest.enabled) {
      totalInterestTaxY = totalInterestY * (interest.taxPercentageOnInterest / 100);
      // simple interest is not counted towards the recurring investments. Thereby
      // the tax on interest in not deducted from the capital.
      if (interest.type === "compounding") {
        currentCapital -= totalInterestTaxY;
      }
    }

    // yearly wealth tax
    if (wealthTax.enabled) {
      let base = wealthTax.excludeWealthYoungerThanOneYear ? startingCapital : currentCapital;
      totalWealthTaxY = base * (wealthTax.percentage / 100);
      currentCapital -= totalWealthTaxY;
    }

    // ending capital
    endingCapital = currentCapital;

    let compoundedRate = (Math.pow(1 + inflationPercentage / 100, y) - 1) * 100;

    inflationAdjustedEndingCapital = endingCapital / (1 + compoundedRate / 100);

    let inflationAdjustedTotalInterestAfterIncomeTaxY =
      (totalInterestY - totalInterestTaxY) / (1 + compoundedRate / 100);

    list.push({
      year: y,
      startingCapital,
      totalInterestY,
      totalContributionY,
      totalInterestTaxY,
      inflationAdjustedTotalInterestAfterIncomeTaxY,
      totalWealthTaxY,
      endingCapital,
      inflationAdjustedEndingCapital,
    });
  }

  // totals
  let totals = {
    investment: capitalAmount + list.reduce((sum, year) => sum + Math.max(year.totalContributionY, 0), 0),
    withdrawl: list.reduce((sum, year) => sum + Math.min(year.totalContributionY, 0), 0),
    periodicContributionOrWithdrawl: list.reduce((sum, year) => sum + year.totalContributionY, 0),
    interest: list.reduce((sum, year) => sum + year.totalInterestY, 0),
    inflationAdjustedTotalInterestAfterIncomeTax: list.reduce(
      (sum, year) => sum + year.inflationAdjustedTotalInterestAfterIncomeTaxY,
      0
    ),
    interestTax: list.reduce((sum, year) => sum + year.totalInterestTaxY, 0),
    wealthTax: list.reduce((sum, year) => sum + year.totalWealthTaxY, 0),
    years,
    endingCapital: list[list.length - 1].endingCapital,
    inflationAdjustedEndingCapital: list[list.length - 1].inflationAdjustedEndingCapital,
  };
  totals.effectiveInflationAdjustedProfit = totals.inflationAdjustedEndingCapital - totals.investment;

  // example
  if (suggestedPriceOfGoldPerGram <= 0) {
    suggestedPriceOfGoldPerGram = 0.00000001;
  }
  let example = {
    goldPurchaseableWithStartingCapital: totals.investment / suggestedPriceOfGoldPerGram,
    goldPurchaseableWithInflationAdjustedEndingCapital:
      totals.inflationAdjustedEndingCapital / suggestedPriceOfGoldPerGram,
  };

  return { input, list, totals, example };
}
