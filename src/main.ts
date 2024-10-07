import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router";

import "./index.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEdit, faRemove, faAdd } from "@fortawesome/free-solid-svg-icons";

library.add(faEye, faEdit, faRemove, faAdd)


createApp(App).use(router).mount("#app");
