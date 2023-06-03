import { createRouter, createWebHistory } from 'vue-router';
// import { defineAsyncComponent } from 'vue'



const main_page                = () => import("@/components/screen/main_page.vue");
const types_of_awards_page     = () => import("@/components/screen/types_of_awards_page.vue");
const team_track_winners       = () => import("@/components/screen/team_track_winners.vue");
const corporate                = () => import("@/components/screen/corporate.vue");
const photo_gallery            = () => import("@/components/screen/photo_gallery.vue");
const certificates             = () => import("@/components/screen/certificates.vue");




const routes = [
  { path: '/:pathMatch(.*)*',   redirect: { name: 'main_page' }},
  { path: '/',                                      component: main_page,               name: 'main_page'},
  { path: '/виды_наград',                           component: types_of_awards_page,    name: 'types_of_awards_page'},
  { path: '/победители_и_лауреаты',                 component: team_track_winners,      name: 'team_track_winners'},
  { path: '/Победители_командного_трека',           component: corporate,               name: 'corporate_winners',        meta:{title:'Победители командного трека'}},
  { path: '/Лауреаты_ведомственных_наград',         component: corporate,               name: 'corporate_rewards',        meta:{title:'Лауреаты ведомственных наград'}},
  { path: '/Лучшие_корпоративные_тренеры',          component: corporate,               name: 'corporate_trainer',        meta:{title:'Лучшие корпоративные тренеры'}},
  { path: '/Лучшие_производственные_наставники',    component: corporate,               name: 'corporate_mentor',         meta:{title:'Лучшие производственные наставники'}},
  { path: '/фотогаллерея',                          component: photo_gallery,           name: 'photo_gallery'},
  { path: '/сертификаты',                           component: certificates,            name: 'certificates'},
  ]

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
  })





  router.beforeEach((to, from, next) => {
    const authUser = store.getters["auth/authUser"];
    const reqAuth = to.matched.some((record) => record.meta.requiresAuth);
    const loginQuery = { path: "/login", query: { redirect: to.fullPath } };
  
    if (reqAuth && !authUser) {
      store.dispatch("auth/getAuthUser").then(() => {
        if (!store.getters["auth/authUser"]) next(loginQuery);
        else next();
      });
    } else {
      next(); // make sure to always call next()!
    }
  });
  


export default router;