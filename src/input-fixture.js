import { fixtures } from "./fixtures";

export const inputDataFixture = {
  inputData: {
    capitalAmount: 100_000,
    years: 10,

    periodicContribution: {
      enabled: false,
      type: fixtures.contributionTypeList.find((x) => x.key === "deposit"),
      period: fixtures.contributionPeriodList.find((x) => x.key === "monthly-12-y"),
      amount: 0,
    },
    interest: {
      enabled: true,
      type: fixtures.interestTypeList.find((x) => x.key === "compounding"),
      period: fixtures.interestPeriodList.find((x) => x.key === "yearly-1-y"),
      percentage: 9,
      taxPercentageOnInterest: 5,
    },

    wealthTax: {
      enabled: true,
      percentage: 2.5,
      excludeWealthYoungerThanOneYear: true,
    },
    inflationPercentage: 5.86,
    suggestedPriceOfGoldPerGram: 100,
  },
};
