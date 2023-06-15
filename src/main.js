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
    const loginQuery = { name: 'admin_page' };
  
    if (reqAuth && !isAdmin) {
      try{
        await store.getAuthAdmin();
        next()
      }catch{
        next(loginQuery);
      }
      
    } else {
      next(); // make sure to always call next()!
    }

  });



store.getAuthAdmin().catch(e=>console.info("Не авторизован"));

app.mount("#app");
