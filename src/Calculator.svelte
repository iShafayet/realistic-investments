<script>
  import Button, { Label } from "@smui/button";
  import Textfield from "@smui/textfield";
  import Checkbox from "@smui/checkbox";
  import HelperText from "@smui/textfield/helper-text";
  import FormField from "@smui/form-field";
  import Card from "@smui/card";
  import Switch from "@smui/switch";
  import Select, { Option } from "@smui/select";

  import { calculateResults } from "./calculations";

  const interestTypeList = [
    { key: "simple", label: "Simple" },
    { key: "compounding", label: "Compounding" },
  ];
  const interestPeriodList = [
    {
      key: "monthly-12-y",
      label: "Monthly (12/y)",
    },
    {
      key: "yearly-1-y",
      label: "Yearly (1/y)",
    },
  ];

  const contributionTypeList = [
    { key: "deposit", label: "Deposit" },
    { key: "withdrawal", label: "Withdrawal" },
  ];
  const contributionPeriodList = [
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
  ];

  let years = 10;

  let capitalAmount = 1_00_000;

  let inflationPercentage = 5.86;

  let periodicContribution = {
    enabled: false,
    type: contributionTypeList.find((x) => x.key === "deposit"),
    period: contributionPeriodList.find((x) => x.key === "monthly-12-y"),
    amount: 0,
  };

  let interest = {
    enabled: false,
    type: interestTypeList.find((x) => x.key === "compounding"),
    period: interestPeriodList.find((x) => x.key === "yearly-1-y"),
    percentage: 9,
    taxPercentageOnInterest: 0,
  };

  let wealthTax = {
    enabled: false,
    percentage: 2.5,
    excludeWealthYoungerThanOneYear: true,
  };

  function calculateClicked() {
    let input = {
      capitalAmount,
      inflationPercentage,
      periodicContribution,
      interest,
      wealthTax,
      years,
    };

    input = JSON.parse(JSON.stringify(input));

    input.interest.period = input.interest.period.key;
    input.interest.type = input.interest.type.key;
    input.periodicContribution.type = input.periodicContribution.type.key;
    input.periodicContribution.period = input.periodicContribution.period.key;

    console.log("INPUT", input);
    let results = calculateResults(input);
    console.log("RESULTS", results);
  }
</script>

<div class="calculation-container">
  <Card class="card essential-card" padded>
    <Textfield
      bind:value={capitalAmount}
      label="Capital amount"
      class="textfield"
      type="number"
    >
      <HelperText slot="helper">
        This is the initial amount of your investment/savings.
      </HelperText>
    </Textfield>

    <Textfield
    bind:value={years}
    label="Duration (years)"
    class="textfield"
    type="number"
  >
    <HelperText slot="helper">
      For how long do you want to simulate?
    </HelperText>
  </Textfield>

    <Textfield
      bind:value={inflationPercentage}
      label="Inflation percentage"
      class="textfield"
      type="number"
      step="0.01"
    >
      <HelperText slot="helper">
        Put in the annual inflation rate for your country/currency.
      </HelperText>
    </Textfield>
  </Card>

  <Card class="card contribution-card" padded>
    <FormField align="end">
      <Switch bind:checked={periodicContribution.enabled} />
      <span slot="label">Periodic contribution or withdrawal</span>
    </FormField>

    {#if periodicContribution.enabled}
      <Select
        bind:value={periodicContribution.type}
        key={(contributionType) =>
          `${(contributionType && contributionType.key) || ""}`}
        label="Type"
      >
        {#each contributionTypeList as contributionType (contributionType.label)}
          <Option value={contributionType}>{contributionType.label}</Option>
        {/each}
      </Select>

      <Select
        bind:value={periodicContribution.period}
        key={(contributionPeriod) =>
          `${(contributionPeriod && contributionPeriod.key) || ""}`}
        label="Period / Frequency"
      >
        {#each contributionPeriodList as contributionPeriod (contributionPeriod.label)}
          <Option value={contributionPeriod}>{contributionPeriod.label}</Option>
        {/each}
      </Select>

      <Textfield
        bind:value={periodicContribution.amount}
        label="Amount"
        class="textfield"
        type="number"
      >
        <HelperText slot="helper">
          The amount of contribution(deposit) or withdrawal.
        </HelperText>
      </Textfield>
    {/if}
  </Card>

  <Card class="card interest-card" padded>
    <FormField align="end">
      <Switch bind:checked={interest.enabled} />
      <span slot="label">Interest or recurring profit</span>
    </FormField>

    {#if interest.enabled}
      <Select
        bind:value={interest.type}
        key={(interestType) => `${(interestType && interestType.key) || ""}`}
        label="Type"
      >
        {#each interestTypeList as interestType (interestType.label)}
          <Option value={interestType}>{interestType.label}</Option>
        {/each}
      </Select>

      <Select
        bind:value={interest.period}
        key={(interestPeriod) =>
          `${(interestPeriod && interestPeriod.key) || ""}`}
        label="Period / Frequency"
      >
        {#each interestPeriodList as interestPeriod (interestPeriod.label)}
          <Option value={interestPeriod}>{interestPeriod.label}</Option>
        {/each}
      </Select>

      <Textfield
        bind:value={interest.percentage}
        label="Yearly rate (percentage)"
        class="textfield"
        type="number"
      >
        <HelperText slot="helper">
          The YEARLY rate (percentage) of interest / profit
        </HelperText>
      </Textfield>

      <Textfield
        bind:value={interest.taxPercentageOnInterest}
        label="Tax percentage on interest income (Yearly rate)"
        class="textfield"
        type="number"
      >
        <HelperText slot="helper">Set to 0 if not applicable.</HelperText>
      </Textfield>
    {/if}
  </Card>

  <Card class="card wealth-tax-card" padded>
    <FormField align="end">
      <Switch bind:checked={wealthTax.enabled} />
      <span slot="label">Yearly wealth tax</span>
    </FormField>

    {#if wealthTax.enabled}
      <Textfield
        bind:value={wealthTax.percentage}
        label="Percentage"
        class="textfield"
        type="number"
      >
        <HelperText slot="helper">Yearly wealth tax percentage.</HelperText>
      </Textfield>

      <FormField>
        <Checkbox bind:checked={wealthTax.excludeWealthYoungerThanOneYear} />
        <span slot="label">Exclude wealth younger than one year.</span>
      </FormField>
    {/if}
  </Card>

  <Button on:click={calculateClicked} variant="raised">
    <Label>Calculate</Label>
  </Button>
</div>

<style>
  .calculation-container {
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .calculation-container :global(.card) {
    width: 100%;
    max-width: 400px;
    margin-bottom: 20px;
  }
</style>
