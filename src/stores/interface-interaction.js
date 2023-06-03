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
    imges:[
      {
        id: 1,
        src: `/img/slider/img.svg`
      },
      {
        id: 2,
        src: `/img/slider/img.svg`
      },
      {
        id: 3,
        src: `/img/slider/img.svg`
      },
      {
        id: 4,
        src: `/img/slider/img.svg`
      },
      {
        id: 5,
        src: `/img/slider/img.svg`
      },
      {
        id: 6,
        src: `/img/slider/img.svg`
      },
      {
        id: 7,
        src: `/img/slider/img.svg`
      },
      {
        id: 8,
        src: `/img/slider/img.svg`
      },
      {
        id: 9,
        src: `/img/slider/img.svg`
      },
      {
        id: 10,
        src: `/img/slider/img.svg`
      },
      {
        id: 11,
        src: `/img/slider/img.svg`
      },
      {
        id: 12,
        src: `/img/slider/img.svg`
      },
    ],
    commandAwards:[
      {
        id: 1,
        nomination: `Номинация «Производственное решение года»`,
        description: `Система видеоинспекции для проверки качества гидроструйной чистки петлевых реакторов ПЭВП ЗСНХ`,
        authors: `Михаил Бурый, Юрий Дерюгин, Иван Тарасов, Георгий Клевцов.`,
        year: 2022
      },
      {
        id: 2,
        nomination: `Номинация «Лучшее организационное решение»`,
        description: `Проект «Оптимизатор»`,
        authors: `Рустам Гилязов, Алена Безрукова, Евгений Поляков.`,
        year: 2022
      },
      {
        id: 3,
        nomination: `Номинация «Решение в области работы с клиентами»`,
        description: `Коллаборация СИБУР и WOS: капсульная коллекция одежды из переработанного пластика`,
        authors: `Константин Вернигоров, Анастасия Щербинина, Константин Лукошко, Иванна Гребенюк.`,
        year: 2022
      },
      {
        id: 4,
        nomination: `Номинация «Приз зрительских симпатий»`,
        description: `Замещение импортных и отечественных марок полиолефинов на специальные марки СИБУР`,
        authors: `Авторы: Александр Мазильников, Камиля Мамлеева, Валерий Панарин, Иван Турчан, Ильдар Салахов.`,
        year: 2023
      },
    ],
    popupSlider: false,
    enableSlide: 1,

    /* тестовый массив, потом удалить */
    testCorporateArray:[
      {
        id: 1,
        src: `/img/template_photo/men.svg`,
        name: "Иванов Иван",
        post: "Инженер",
        filter: "ООО “ЗапСибНефтехим”",
        reward: "Почётная грамота",
        date: "МИНЭНЕРГО",
      },
      {
        id: 2,
        src: `/img/template_photo/men.svg`,
        name: "Иванов Иван",
        post: "Инженер",
        filter: "ООО “ЗапСибНефтехим”",
        reward: "Почётная грамота",
        date: "МИНЭНЕРГО",
      },
      {
        id: 3,
        src: `/img/template_photo/men.svg`,
        name: "Иванов Иван",
        post: "Инженер",
        filter: "ООО “ЗапСибНефтехим”",
        reward: "Почётная грамота",
        date: "МИНЭНЕРГО",
      },
      {
        id: 4,
        src: `/img/template_photo/men.svg`,
        name: "Иванов Иван",
        post: "Инженер",
        filter: "ООО “ЗапСибНефтехим”",
        reward: "Почётная грамота",
        date: "МИНЭНЕРГО",
      },
      {
        id: 5,
        src: `/img/template_photo/men.svg`,
        name: "Иванов Иван",
        post: "Инженер",
        filter: "ООО “ЗапСибНефтехим”",
        reward: "Почётная грамота",
        date: "МИНЭНЕРГО",
      },
      {
        id: 6,
        src: `/img/template_photo/men.svg`,
        name: "Иванов Иван",
        post: "Инженер",
        filter: "ООО “ЗапСибНефтехим”",
        reward: "Почётная грамота",
        date: "МИНЭНЕРГО",
      },
      {
        id: 7,
        src: `/img/template_photo/men.svg`,
        name: "Иванов Иван",
        post: "Инженер",
        filter: "ООО “ЗапСибНефтехим”",
        reward: "Почётная грамота",
        date: "МИНЭНЕРГО",
      },
      {
        id: 8,
        src: `/img/template_photo/men.svg`,
        name: "Иванов Иван",
        post: "Инженер",
        filter: "ООО “ЗапСибНефтехим”",
        reward: "Почётная грамота",
        date: "МИНЭНЕРГО",
      },
      {
        id: 9,
        src: `/img/template_photo/men.svg`,
        name: "Иванов Иван",
        post: "Инженер",
        filter: "ООО “ЗапСибНефтехим”",
        reward: "Почётная грамота",
        date: "МИНЭНЕРГО",
      },
      {
        id: 10,
        src: `/img/template_photo/men.svg`,
        name: "Иванов Иван",
        post: "Инженер",
        filter: "ООО “ЗапСибНефтехим”",
        reward: "Почётная грамота",
        date: "МИНЭНЕРГО",
      },
    ]
    /* ------------------------------ */
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
    }
    
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
      let awards =await this.api.getCommandAwards();
      this.commandAwards = awards.data.data;
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



