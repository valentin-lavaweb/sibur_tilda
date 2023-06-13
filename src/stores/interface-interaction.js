import { defineStore } from "pinia";
// import auth, {authClient} from "../scripts/auth.js";
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
    // auth(state){
    //   authClient.interceptors.response.use(
    //     (response) => {
    //       return response;
    //     },
    //     function (error) {
    //       if (
    //         error.response &&
    //         [401, 419].includes(error.response.status) &&
    //         Boolean(state.admin)
    //       ) {
    //         state.logout();
    //       }
    //       return Promise.reject(error);
    //     }
    //   );

    //   return auth
    // },
    api(state){
      apiClient.interceptors.response.use(
        (response) => {
          return response;
        },
        function (error) {
          if (
            error.response &&
            [401, 419].includes(error.response.status) &&
            Boolean(state.admin)
          ) {
            state.logout();
          }
          if(import.meta.env.DEV){
            console.log(error.response);
          }

          if(error.response?.data?.message){
            return Promise.reject(new Error(error.response.data.message));
          }
          if(error.response){
            return Promise.reject(new Error(error.response.statusText));
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
      let adminData = await this.api.login({email, password});
      this.admin = adminData.data;
    },
    async getAuthAdmin(){
      let adminData = await this.api.getAuthAdmin();
      this.admin = adminData.data;
    },
    async logout(){
      await this.api.logout();
      this.admin = null;
    }
  },
});



