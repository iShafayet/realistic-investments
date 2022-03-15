<script>
  import Header from "./Header.svelte";
  import Calculator from "./Calculator.svelte";
</script>

<main>
  <Header />
  <Calculator />
</main>

<style>
  main {
    padding: 1em;
    /* max-width: 240px; */
    margin: 0 auto;
  }

  @media (min-width: 640px) {
    main {
    }
  }
</style>
