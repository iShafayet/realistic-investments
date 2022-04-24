<script>
  import Button, { Label } from "@smui/button";

  import Output from "./Output.svelte";
  import InputDiv from "./Input.svelte";
  import { calculateResults } from "./calculations";
  import { fixtures } from "./fixtures";
  import { inputDataFixture } from "./input-fixture";

  let { inputData } = inputDataFixture;

  let results = null;
  let currency = "$";

  function notifyChange() {
    results = null;
  }

  function calculateClicked() {
    let input = JSON.parse(JSON.stringify(inputData));

    input.interest.period = input.interest.period.key;
    input.interest.type = input.interest.type.key;
    input.periodicContribution.type = input.periodicContribution.type.key;
    input.periodicContribution.period = input.periodicContribution.period.key;

    console.debug("INPUT", input);
    results = calculateResults(input);
    console.debug("RESULTS", results);
  }
</script>

<div class="calculation-container">
  <InputDiv class="input" {inputData} {notifyChange} bind:currency />

  <Button on:click={calculateClicked} variant="raised">
    <Label>Calculate</Label>
  </Button>

  <Output class="output" data={results} bind:currency />
</div>

<style>
  .calculation-container {
    margin-top: 00px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .calculation-container :global(.card) {
    width: 100%;
    max-width: 400px;
    margin-bottom: 20px;
  }

  .calculation-container :global(.output) {
    margin-top: 20px;
    margin-bottom: 20px;
  }
</style>
