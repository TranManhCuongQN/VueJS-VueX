import { createApp } from "vue";
import App from "./App.vue";
import store from "./store/index.js";

import AppModal from "./components/AppModal.vue";
const app = createApp(App);

// Sử dụng được vueX
app.use(store);

app.component("app-modal", AppModal);
app.mount("#app");
