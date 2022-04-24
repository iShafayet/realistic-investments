<script>
  import DataTable, { Head, Body, Row, Cell } from "@smui/data-table";

  export let data = undefined;
  export let currency = undefined;

  const internationalNumberFormat = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  });

  function inspect(data) {
    return JSON.stringify(data);
  }

  function gentrify(number) {
    return (
      currency +
      "" +
      internationalNumberFormat.format(Math.round(number * 100) / 100)
    );
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
    <div class="section-title">Your projections</div>

    <div class="summary">
      With a total investment of <span class="highlight"
        >{gentrify(data.totals.investment)}</span
      >, after
      <span class="highlight">{data.totals.years}</span>
      years, your total will be
      <span class="highlight">{gentrify(data.totals.endingCapital)}</span>.
      However, taking inflation into account, in today's money, that will be
      equivalent to
      <span class="highlight"
        >{gentrify(data.totals.inflationAdjustedEndingCapital)}</span
      >.
    </div>

    <div class="section-title">Detailed breakdown</div>

    <DataTable class="data-table" table$aria-label="Calculation results">
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
        {#each data.list as dataRow, i}
          <Row>
            <Cell>{dataRow.year}</Cell>
            <Cell numeric>
              {#if i == 0}
                <span class="bold">{gentrify(dataRow.startingCapital)}</span>
              {/if}
              {#if i != 0}
                {gentrify(dataRow.startingCapital)}
              {/if}
            </Cell>
            <Cell numeric>{gentrify(dataRow.totalContributionY)}</Cell>
            <Cell numeric>{gentrify(dataRow.totalInterestY)}</Cell>
            <Cell numeric>{gentrify(dataRow.totalInterestTaxY)}</Cell>
            <Cell numeric>{gentrify(dataRow.totalWealthTaxY)}</Cell>
            <Cell numeric>
              {#if i == data.list.length - 1}
                <span class="bold">{gentrify(dataRow.endingCapital)}</span>
              {/if}
              {#if i != data.list.length - 1}
                {gentrify(dataRow.endingCapital)}
              {/if}
            </Cell>
            <Cell numeric>
              {#if i == data.list.length - 1}
                <span class="bold"
                  >{gentrify(dataRow.inflationAdjustedEndingCapital)}</span
                >
              {/if}
              {#if i != data.list.length - 1}
                {gentrify(dataRow.inflationAdjustedEndingCapital)}
              {/if}
            </Cell>
          </Row>
        {/each}
        <Row>
          <Cell><span class="bold">Total</span></Cell>
          <Cell numeric />
          <Cell numeric>
            <span class="bold">
              {gentrify(data.totals.periodicContributionOrWithdrawl)}
            </span>
          </Cell>
          <Cell numeric>
            <span class="bold">
              {gentrify(data.totals.interest)}
            </span>
          </Cell>
          <Cell numeric>
            <span class="bold">{gentrify(data.totals.interestTax)}</span>
          </Cell>
          <Cell numeric>
            <span class="bold">{gentrify(data.totals.wealthTax)}</span>
          </Cell>
          <Cell numeric />
          <Cell numeric />
        </Row>
      </Body>
    </DataTable>
  {/if}
</div>

<style>
  .output {
    max-width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .output :global(.mdc-data-table) {
    margin-left: 10px;
    margin-right: 10px;
    max-width: calc(100% - 20px);
  }
  .output :global(.mdc-data-table__header-cell) {
    font-weight: bold;
  }

  .section-title {
    font-size: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
    text-align: center;
  }

  .highlight {
    font-weight: bold;
  }

  .summary {
    margin-left: 10px;
    margin-right: 10px;
    line-height: 1.4;
    max-width: 600px;
  }

  .bold {
    font-weight: bold;
  }
</style>
