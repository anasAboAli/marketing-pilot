import { createApp } from "vue";
import { createPinia } from "pinia";
import "./styles/variables.css";
import "./styles/global.css";
import VueApexCharts from "vue3-apexcharts";

import App from "./App.vue";
import router from "./router";
import BaseButton from "./components/base/BaseButton.vue";
import BaseCard from "./components/base/BaseCard.vue";
import BaseInput from "./components/base/BaseInput.vue";
import BaseBadge from "./components/base/BaseBadge.vue";

import "./style.css";

const app = createApp(App);
app.component("ApexChart", VueApexCharts);
app.component("BaseButton", BaseButton);
app.component("BaseCard", BaseCard);
app.component("BaseInput", BaseInput);
app.component("BaseBadge", BaseBadge);
app.use(createPinia());
app.use(router);

app.mount("#app");
