<script>
  import Header from "./Header.svelte";
  import Calculator from "./Calculator.svelte";
  import Footer from "./Footer.svelte";
</script>

<main>
  <Header />
  <Calculator />
  <Footer />
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
