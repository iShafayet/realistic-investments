export const fixtures = {
  interestTypeList: [
    { key: "simple", label: "Simple" },
    { key: "compounding", label: "Compounding" },
  ],

  interestPeriodList: [
    {
      key: "monthly-12-y",
      label: "Monthly (12/y)",
    },
    {
      key: "yearly-1-y",
      label: "Yearly (1/y)",
    },
  ],

  contributionTypeList: [
    { key: "deposit", label: "Deposit" },
    { key: "withdrawal", label: "Withdrawal" },
  ],

  contributionPeriodList: [
    {
      key: "monthly-12-y",
      label: "Start of every month (12/y)",
    },
    {
      key: "quarterly-4-y",
      label: "Start of every quarter (4/y)",
    },
    {
      key: "yearly-1-y",
      label: "Start of every year (1/y)",
    },
  ],
};
