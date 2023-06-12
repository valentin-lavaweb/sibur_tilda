import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

import toaster from "./toaster/index";

import "./assets/main.css";

import router from './router.js';


window.global = window;
const pinia = createPinia();
const app = createApp(App);






app.use(pinia);
app.use(toaster);
app.use(router);




import {useGameStore} from "./stores/interface-interaction.js";
const store = useGameStore();

  router.beforeEach(async(to, from, next) => {



    if(!store.personalSections){
        await store.loadSections();
    }


    const isAdmin = Boolean(store.admin);
    const reqAuth = to.matched.some((record) => record.meta.requiresAuth);
    const loginQuery = { path: "/login", query: { redirect: to.fullPath } };
  
    if (reqAuth && !isAdmin) {
      store.getAuthAdmin().then(() => {
        if (!Boolean(store.admin)) next(loginQuery);
        else next();
      });
    } else {
      next(); // make sure to always call next()!
    }

  });



store.login();

app.mount("#app");
