<script>
  import Textfield from "@smui/textfield";
  import Checkbox from "@smui/checkbox";
  import HelperText from "@smui/textfield/helper-text";
  import FormField from "@smui/form-field";
  import Card from "@smui/card";
  import Switch from "@smui/switch";
  import Select, { Option } from "@smui/select";

  import { fixtures } from "./fixtures";
  import { currencyList } from "./currency-list";

  export let notifyChange = undefined;
  export let inputData = undefined;
  export let currency = undefined;

  let showAdvancedControls = false;

  let inputDivEl;

  let currencySelectedItem = currencyList.find((c) => c.key === "USD");

  function onInputChange(inputData) {
    if (notifyChange) {
      notifyChange();
    }
  }

  function onCurrencyChange(currencySelectedItem) {
    if (currencySelectedItem) {
      currency = currencySelectedItem.sign;
      inputData.suggestedPriceOfGoldPerGram =
        currencySelectedItem.defaultSuggestedPriceOfGoldPerGram;
    }
  }

  $: {
    onCurrencyChange(currencySelectedItem);
    onInputChange(inputData);
  }
</script>

<div class="input-container" bind:this={inputDivEl}>
  <Card class="card essential-card" padded>
    <Select
      bind:value={currencySelectedItem}
      key={(currency) => `${(currency && currency.key) || ""}`}
      label="Currency"
    >
      {#each currencyList as currency (currency.label)}
        <Option value={currency}>{currency.label} ({currency.sign})</Option>
      {/each}
    </Select>

    <Textfield
      bind:value={inputData.capitalAmount}
      label="Capital amount"
      class="textfield"
      type="number"
      input$min="0"
    >
      <HelperText persistent slot="helper">
        Enter how much money are you initially investing.
      </HelperText>
    </Textfield>

    <Textfield
      bind:value={inputData.years}
      label="Investment duration (years)"
      class="textfield"
      type="number"
      input$min="1"
    >
      <HelperText persistent slot="helper">
        For how long do you want to project?
      </HelperText>
    </Textfield>
  </Card>

  <Card class="card contribution-card" padded>
    <FormField align="end">
      <Switch bind:checked={inputData.periodicContribution.enabled} />
      <span slot="label">Periodic Contribution or Withdrawal</span>
    </FormField>

    {#if inputData.periodicContribution.enabled}
      <Select
        bind:value={inputData.periodicContribution.type}
        key={(contributionType) =>
          `${(contributionType && contributionType.key) || ""}`}
        label="Type"
      >
        {#each fixtures.contributionTypeList as contributionType (contributionType.label)}
          <Option value={contributionType}>{contributionType.label}</Option>
        {/each}
      </Select>

      <Select
        bind:value={inputData.periodicContribution.period}
        key={(contributionPeriod) =>
          `${(contributionPeriod && contributionPeriod.key) || ""}`}
        label="Period / Frequency"
      >
        {#each fixtures.contributionPeriodList as contributionPeriod (contributionPeriod.label)}
          <Option value={contributionPeriod}>{contributionPeriod.label}</Option>
        {/each}
      </Select>

      <Textfield
        bind:value={inputData.periodicContribution.amount}
        label="Amount"
        class="textfield"
        type="number"
        input$min="0"
      >
        <HelperText persistent slot="helper">
          The amount of contribution/deposit or withdrawal.
        </HelperText>
      </Textfield>
    {/if}
  </Card>

  <Card class="card inputData.interest-card" padded>
    <FormField align="end">
      <Switch bind:checked={inputData.interest.enabled} />
      <span slot="label">Interest / Mudarabah / Recurring Profit</span>
    </FormField>

    {#if inputData.interest.enabled}
      <Select
        bind:value={inputData.interest.type}
        key={(interestType) => `${(interestType && interestType.key) || ""}`}
        label="Type"
      >
        {#each fixtures.interestTypeList as interestType (interestType.label)}
          <Option value={interestType}>{interestType.label}</Option>
        {/each}
      </Select>

      <Select
        bind:value={inputData.interest.period}
        key={(interestPeriod) =>
          `${(interestPeriod && interestPeriod.key) || ""}`}
        label="Period / Frequency"
      >
        {#each fixtures.interestPeriodList as interestPeriod (interestPeriod.label)}
          <Option value={interestPeriod}>{interestPeriod.label}</Option>
        {/each}
      </Select>

      <Textfield
        bind:value={inputData.interest.percentage}
        label="Yearly rate (%)"
        class="textfield"
        type="number"
        input$step={0.01}
        input$min="0"
      >
        <HelperText persistent slot="helper">
          The yearly rate of interest / projected profit.
        </HelperText>
      </Textfield>

      <Textfield
        bind:value={inputData.interest.taxPercentageOnInterest}
        label="Tax on above profit/interest income (%)"
        class="textfield"
        type="number"
        input$step={0.01}
        input$min="0"
      >
        <HelperText persistent slot="helper"
          >Set to 0 if not applicable.</HelperText
        >
      </Textfield>
    {/if}
  </Card>

  <Card class="card wealth-tax-card" padded>
    <FormField align="end">
      <Switch bind:checked={inputData.wealthTax.enabled} />
      <span slot="label">Yearly Wealth-tax / Zaqat</span>
    </FormField>

    {#if inputData.wealthTax.enabled}
      <Textfield
        bind:value={inputData.wealthTax.percentage}
        label="Rate (%)"
        class="textfield"
        type="number"
        input$step={0.01}
        input$min="0"
      >
        <HelperText persistent slot="helper"
          >Yearly wealth-tax/zaqat percentage (regarding this investment).</HelperText
        >
      </Textfield>

      <FormField>
        <Checkbox
          bind:checked={inputData.wealthTax.excludeWealthYoungerThanOneYear}
        />
        <span slot="label">Exclude wealth younger than one year.</span>
      </FormField>
    {/if}
  </Card>

  <Card class="card wealth-tax-card" padded>
    <FormField align="end">
      <Switch bind:checked={showAdvancedControls} />
      <span slot="label">Inflation &amp; Advanced Options</span>
    </FormField>

    {#if showAdvancedControls}
      <Textfield
        bind:value={inputData.inflationPercentage}
        label="Annual Inflation Rate (%)"
        class="textfield"
        type="number"
        input$step={0.01}
        input$min="0"
      >
        <HelperText persistent slot="helper">
          Put in the annual inflation rate for your country/currency.
        </HelperText>
      </Textfield>

      <Textfield
        bind:value={inputData.suggestedPriceOfGoldPerGram}
        label="Price of Gold per Gram"
        class="textfield"
        type="number"
        input$step={0.01}
        input$min="0"
      >
        <HelperText persistent slot="helper">
          For calculating the examples.
        </HelperText>
      </Textfield>
    {/if}
  </Card>
</div>

<style>
  .input-container :global(.mdc-text-field-helper-text) {
    margin-bottom: 10px;
  }

  .input-container :global(.mdc-select) {
    margin-bottom: 10px;
  }
</style>
