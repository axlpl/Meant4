import { createApp } from "vue";
import { createPinia } from "pinia";

import registerPlugins from "@/plugins";
import vuetify from "./plugins/vuetify";
import i18n from "./plugins/i18n";

import App from "./App.vue";

const app = createApp(App);

registerPlugins(app);

app.use(i18n);
app.use(vuetify);
app.use(createPinia());

app.mount("#app");
