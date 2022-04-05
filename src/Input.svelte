<script>
  import Textfield from "@smui/textfield";
  import Checkbox from "@smui/checkbox";
  import HelperText from "@smui/textfield/helper-text";
  import FormField from "@smui/form-field";
  import Card from "@smui/card";
  import Switch from "@smui/switch";
  import Select, { Option } from "@smui/select";
  
  import { fixtures } from "./fixtures";

  export let inputData = undefined;
  let showAdvancedControls = false;

  let inputDivEl;
</script>

<div class="input" bind:this={inputDivEl}>
  <Card class="card essential-card" padded>
    <Textfield
      bind:value={inputData.capitalAmount}
      label="Capital amount"
      class="textfield"
      type="number"
    >
      <HelperText slot="helper">
        This is the initial amount of your investment/savings.
      </HelperText>
    </Textfield>

    <Textfield
      bind:value={inputData.years}
      label="Duration (inputData.years)"
      class="textfield"
      type="number"
    >
      <HelperText slot="helper">
        For how long do you want to simulate?
      </HelperText>
    </Textfield>
  </Card>

  <Card class="card contribution-card" padded>
    <FormField align="end">
      <Switch bind:checked={inputData.periodicContribution.enabled} />
      <span slot="label">Periodic contribution or withdrawal</span>
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
      >
        <HelperText slot="helper">
          The amount of contribution(deposit) or withdrawal.
        </HelperText>
      </Textfield>
    {/if}
  </Card>

  <Card class="card inputData.interest-card" padded>
    <FormField align="end">
      <Switch bind:checked={inputData.interest.enabled} />
      <span slot="label">inputData.interest or recurring profit</span>
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
        label="Yearly rate (percentage)"
        class="textfield"
        type="number"
      >
        <HelperText slot="helper">
          The YEARLY rate (percentage) of inputData.interest / profit
        </HelperText>
      </Textfield>

      <Textfield
        bind:value={inputData.interest.taxPercentageOnInterest}
        label="Tax percentage on inputData.interest income (Yearly rate)"
        class="textfield"
        type="number"
      >
        <HelperText slot="helper">Set to 0 if not applicable.</HelperText>
      </Textfield>
    {/if}
  </Card>

  <Card class="card wealth-tax-card" padded>
    <FormField align="end">
      <Switch bind:checked={inputData.wealthTax.enabled} />
      <span slot="label">Yearly wealth tax</span>
    </FormField>

    {#if inputData.wealthTax.enabled}
      <Textfield
        bind:value={inputData.wealthTax.percentage}
        label="Percentage"
        class="textfield"
        type="number"
      >
        <HelperText slot="helper">Yearly wealth tax percentage.</HelperText>
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
      <span slot="label">Show advanced controls</span>
    </FormField>

    {#if showAdvancedControls}
      <Textfield
        bind:value={inputData.inflationPercentage}
        label="Inflation percentage"
        class="textfield"
        type="number"
        step="0.01"
      >
        <HelperText slot="helper">
          Put in the annual inflation rate for your country/currency.
        </HelperText>
      </Textfield>
    {/if}
  </Card>
</div>

<style>
</style>
