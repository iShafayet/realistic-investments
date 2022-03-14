import App from "./App.svelte";

const app = new App({
  target: document.body,
  props: {
    version: "0.0.1",
  },
});

export default app;
