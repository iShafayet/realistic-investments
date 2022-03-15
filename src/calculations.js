export function calculateResults({
  capitalAmount,
  inflationPercentage,
  periodicContribution,
  interest,
  wealthTax,
  years,
}) {
  // normalize
  if (interest.enabled && interest.period === "monthly-12-y") {
    interest.percentage = interest.percentage / 12;
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
        if (
          interest.type === "simple" &&
          interest.period === "yearly-1-y" &&
          m % 12 === 0
        ) {
          let instantInterest = currentCapital * (interest.percentage / 100);
          totalInterestY += instantInterest;
        }

        // compounding interests
        if (
          interest.type === "compounding" &&
          interest.period === "monthly-12-y"
        ) {
          let instantInterest = currentCapital * (interest.percentage / 100);
          totalInterestY += instantInterest;
          currentCapital += instantInterest;
        }
        if (
          interest.type === "compounding" &&
          interest.period === "yearly-1-y" &&
          m % 12 === 0
        ) {
          let instantInterest = currentCapital * (interest.percentage / 100);
          totalInterestY += instantInterest;
          currentCapital += instantInterest;
        }
      }
    }

    // total tax on interest
    if (interest.enabled) {
      totalInterestTaxY =
        totalInterestY * (interest.taxPercentageOnInterest / 100);
      currentCapital -= totalInterestTaxY;
    }

    // yearly wealth tax
    if (wealthTax.enabled) {
      let base = wealthTax.excludeWealthYoungerThanOneYear
        ? startingCapital
        : currentCapital;
      totalWealthTaxY = base * (wealthTax.percentage / 100);
      currentCapital -= totalWealthTaxY;
    }

    // ending capital
    endingCapital = currentCapital;

    let compoundedRate = (Math.pow(1 + inflationPercentage / 100, y) - 1) * 100;

    inflationAdjustedEndingCapital = endingCapital / (1 + compoundedRate / 100);

    list.push({
      year: y,
      startingCapital,
      totalInterestY,
      totalContributionY,
      totalWealthTaxY,
      totalInterestTaxY,
      endingCapital,
      inflationAdjustedEndingCapital,
    });
  }

  return list;
}
