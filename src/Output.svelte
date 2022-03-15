<script>
  import DataTable, { Head, Body, Row, Cell } from "@smui/data-table";

  export let data = undefined;

  const internationalNumberFormat = new Intl.NumberFormat("en-US");

  function inspect(data) {
    return JSON.stringify(data);
  }

  function gentrify(number) {
    return internationalNumberFormat.format(Math.round(number * 100) / 100);
  }

  let outputDivEl;
  $: {
    if (data) {
      setTimeout(() => {
        outputDivEl.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    }
  }
</script>

<div class="output" bind:this={outputDivEl}>
  {#if data}
    <DataTable
      class="data-table"
      table$aria-label="Calculation results"
      style="max-width: 100%;"
    >
      <Head>
        <Row>
          <Cell>Year</Cell>
          <Cell numeric>Starting Capital</Cell>
          <Cell numeric>Contributions<br />or, Withdrawals</Cell>
          <Cell numeric>Interest<br />or, Profit</Cell>
          <Cell numeric>Income Tax</Cell>
          <Cell numeric>Wealth Tax</Cell>
          <Cell numeric>Ending Capital</Cell>
          <Cell numeric>Inflation Adjusted<br />Ending Capital</Cell>
        </Row>
      </Head>
      <Body>
        {#each data as dataRow, i}
          <Row>
            <Cell>{dataRow.year}</Cell>
            <Cell numeric>{gentrify(dataRow.startingCapital)}</Cell>
            <Cell numeric>{gentrify(dataRow.totalContributionY)}</Cell>
            <Cell numeric>{gentrify(dataRow.totalInterestY)}</Cell>
            <Cell numeric>{gentrify(dataRow.totalInterestTaxY)}</Cell>
            <Cell numeric>{gentrify(dataRow.totalWealthTaxY)}</Cell>
            <Cell numeric>{gentrify(dataRow.endingCapital)}</Cell>
            <Cell numeric
              >{gentrify(dataRow.inflationAdjustedEndingCapital)}</Cell
            >
          </Row>
        {/each}
      </Body>
    </DataTable>
  {/if}
</div>

<style>
  .output :global(.mdc-data-table__header-cell) {
    font-weight: bold;
  }
</style>
