import "ress";
import App from "./App.svelte";
import { authorize } from "./api";

await authorize();

const app = new App({
  target: document.getElementById("app"),
});

export default app;
