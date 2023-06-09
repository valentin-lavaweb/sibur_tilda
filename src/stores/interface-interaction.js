import { defineStore } from "pinia";
import auth, {authClient} from "../scripts/auth.js";
import api, {apiClient} from "../scripts/api.js";

export function debounce(fn, wait){
  let timer;
 return function(...args){
   if(timer) {
      clearTimeout(timer); // clear any pre-existing timer
   }
   const context = this; // get the current context
   timer = setTimeout(()=>{
      fn.apply(context, args); // call the function if time expires
   }, wait);
 }
}

export const useGameStore = defineStore("interface", {
  state: () => ({
    admin: null,
    personalSections:null,
    // commandAwards: [],
    images: null,
    commandAwards: null,
    popupSlider: false,
    enableSlide: 1,


  }),
  getters: {
    auth(){
      authClient.interceptors.response.use(
        (response) => {
          return response;
        },
        function (error) {
          if (
            error.response &&
            [401, 419].includes(error.response.status) &&
            Boolean(this.admin)
          ) {
            this.logout();
          }
          return Promise.reject(error);
        }
      );

      return auth
    },
    api(){
      apiClient.interceptors.response.use(
        (response) => {
          return response;
        },
        function (error) {
          if (
            error.response &&
            [401, 419].includes(error.response.status) &&
            Boolean(this.admin)
          ) {
            this.logout();
          }
          return Promise.reject(error);
        }
      );

      return api
    },
    isAdmin(state){
      return Boolean(state.admin);
    },
    
  },
  actions: {
    openSlide(id){
      this.popupSlider = true;
      this.enableSlide = id;
    },








    async loadSections(){
      let sections = await this.api.getPersonalAwardSections();
      this.personalSections = sections.data.data;
    },
    async loadCommandAwards(){
      let awards = await this.api.getCommandAwards();
      this.commandAwards = awards.data.data;
    },

    async loadImages(){
      let images = await this.api.getGallery();
      this.images = images.data.data;
    },






    async login(email, password){
      let adminData = await this.auth.login({email, password});
      this.admin = adminData.data;
    },
    async getAuthAdmin(){
      let adminData = await this.auth.getAuthAdmin();
      this.admin = adminData.data;
    },
    async logout(){
      await this.auth.logout();
      this.admin = null;
    }
  },
});



