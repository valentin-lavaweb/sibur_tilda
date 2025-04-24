// src\stores\interface-interaction.js

import { defineStore } from "pinia";
// import auth, {authClient} from "../scripts/auth.js";
import api, { apiClient } from "../scripts/api.js";

export function debounce(fn, wait) {
  let timer;
  return function (...args) {
    if (timer) {
      clearTimeout(timer); // clear any pre-existing timer
    }
    const context = this; // get the current context
    timer = setTimeout(() => {
      fn.apply(context, args); // call the function if time expires
    }, wait);
  };
}

export const useGameStore = defineStore("interface", {
  state: () => ({
    admin: null,
    personalSections: null,
    // commandAwards: [],
    images: null,
    commandAwards: null,
    popupSlider: false,
    enableSlide: null,
    dictionary: {
      main_subtitle: "НАГРАДНАЯ КАМПАНИЯ",
      main_desc: `— это возможность поощрить лучших профессионалов компании
      и вдохновить остальных! СИБУР ежегодно подчеркивает вклад
      сотрудников в развитие холдинга: как благодарственными грамотами,
      так и материальным вознаграждением. `,
      main_subdesc: " Сделаем успех видимым для каждого!",

      awards_title: "ВИДЫ НАГРАД",
      awards_desc:
        "Каждая награда — это способ выразить благодарность за ключевые достижения и мотивировать вас на дальнейшее развитие, профессиональный рост. СИБУР поощряет сотрудников сразу на нескольких уровнях.",

      corporate_title: "КОРПОРАТИВНЫЕ",

      individual_title: "Индивидуальные",
      individual_desc: "За личные достижения и высокую квалификацию.",
      individual_desc_grade_1:
        "1 степень. Супергерои СИБУРа! Ежегодно награду получают 3 лучших сотрудника, которые сделали уникальный вклад в развитие компании и отрасли, продемонстрировали достижения, выходящие за рамки занимаемой должности.",
      individual_desc_grade_2:
        "2 степень. Значительный личный вклад в развитие СИБУРа и результаты «выше ожиданий» – отличительные особенности лауреатов корпоративной награды2 степени.",
      individual_desc_grade_3:
        "3 степень. Награду получают как опытные специалисты, так и новички – те сотрудники, которые внесли значимый вклад в развитие своего предприятия и получили признание в коллективе.",

      command_title: "Командные номинации",
      command_title_2: "Командные номинации 2022, 2023 года",
      command_title_3: "Командные номинации 2024 года",
      command_desc: `Поощрение значимых командных достижений
      и вклад участников в развитие отрасли.`,
      individual_desc_grade_3:
        "3 степень. Награду получают как опытные специалисты, так и новички – те сотрудники, которые внесли значимый вклад в развитие своего предприятия и получили признание в коллективе.",

      department_title: "ВЕДОМСТВЕННЫЕ",
      department_desc: `Награды вручаются за весомый вклад в развитие компании и индустрии в целом. Достижения подчеркиваются орденами, благодарностями и дипломами от Минпромторга, Минэнерго, Российского союза химиков, а также органов местного самоуправления.`,

      sertificates_title: "СЕРТИФИКАТЫ",
      sertificate_desc:
        "Уважаемые коллеги, вы можете скачать сертификат участника наградной кампании«Энергия признания СИБУР» 2022. ",
      frame_desc:
        "Вы можете скачать рамку для социальных сетей и поделиться своими профессиональными достижениями с друзьями. ",
      frame_note:
        "*Рекомендуем делать фоторамки с личных мобильных устройств и планшетов.С корпоративного ноутбука может некорректно отображаться изображение.",
    },
    dictionary: null,

    focusedEditPopup: null,
    news: null,
    newsMeta: {
      perPage: 5,
      currentPage: 1,
      lastPage: 1,
      total: 1,
      from: 1,
      to: 1,
    },
    currentNews: null, // детальная новость
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
    api(state) {
      apiClient.interceptors.response.use(
        (response) => {
          return response;
        }
        // function (error) {
        //   if (
        //     error.response &&
        //     [401, 419].includes(error.response.status) &&
        //     Boolean(state.admin)
        //   ) {
        //     console.log(error);
        //     state.logout();
        //   }
        //   if (import.meta.env.DEV) {
        //     console.warn(error.response);
        //   }

        //   if (error.response?.data?.message) {
        //     return Promise.reject(new Error(error.response.data.message));
        //   }
        //   if (error.response) {
        //     return Promise.reject(new Error(error.response.statusText));
        //   }
        //   return Promise.reject(error);
        // }
      );

      return api;
    },
    isAdmin(state) {
      return Boolean(state.admin);
    },

    availableNominations(state) {
      const uniqueTable = {};
      let awards = state.commandAwards.filter(
        ({ nomination }) =>
          !uniqueTable[nomination] && (uniqueTable[nomination] = 1)
      );
      return awards;
    },
  },
  actions: {
    async ensureAuth() {
      if (!this.admin) {
        try {
          await this.getAuthAdmin();
        } catch {
          throw new Error("Сначала выполните login(email, password)");
        }
      }
    },

    openSlide(slide) {
      this.popupSlider = true;
      this.enableSlide = slide;
    },

    async loadSections() {
      let sections = await this.api.getPersonalAwardSections();
      this.personalSections = sections.data.data;
    },
    async loadCommandAwards() {
      let awards = await this.api.getCommandAwards();
      this.commandAwards = awards.data.data;
    },

    async loadImages() {
      let images = await this.api.getGallery();
      this.images = images.data.data;
    },

    async createImage(data) {
      await this.ensureAuth();
      return api.createImage(data);
    },

    async updateImage(id, data) {
      await this.ensureAuth();
      return api.updateImage(id, data);
    },

    async deleteImage(id) {
      await this.ensureAuth();
      return api.deleteImage(id);
    },

    async loadDictionary() {
      let res = await this.api.getDictionary();
      let dictionary = res.data.data;
      console.log("Dictionary API response:", res.data);

      let result = {};
      if (Array.isArray(dictionary)) {
        for (let item of dictionary) {
          result[item.key] = item.text;
        }
      } else {
        console.warn("Dictionary is not iterable:", dictionary);
      }

      this.dictionary = result;
    },

    // async loadNews(page = 1) {
    //   const res = await this.api.getNews(page);
    //   this.news = res.data.data;
    //   this.newsMeta = res.data.meta;
    // },

    async loadNews(page = 1) {
      const totalItems = 15;
      const perPage = this.newsMeta.perPage;

      const fakeNews = Array.from({ length: totalItems }, (_, i) => ({
        id: i,
        title: `Новость ${i + 1}`,
        content: `Содержимое новости ${i + 1}`,
        published_at: new Date().toISOString(),
        preview: `Превью для новости ${i + 1}`,
        previewInfo: {
          uuid: "uuid",
          url: `/img/newsPlaceholder${(i + 1) % 2}.png`,
          originalName: "preview.jpg",
          extension: "jpg",
          size: 12345,
        },
        gallery: [],
      }));

      const start = (page - 1) * perPage;
      const end = start + perPage;

      this.news = fakeNews.slice(start, end);
      this.newsMeta = {
        perPage,
        currentPage: page,
        lastPage: Math.ceil(totalItems / perPage),
        total: totalItems,
        from: start + 1,
        to: Math.min(end, totalItems),
      };
    },

    /** загрузить одну новость */
    async loadNewsById(id) {
      const newsId = parseInt(id);
      const fakeNews = Array.from({ length: 15 }, (_, i) => ({
        id: i + 1,
        title: `Новость ${i + 1}`,
        content: `
				<p>Это подробное описание новости с ID №${
          i + 1
        }. Здесь можно писать текст. Можно писать много текста. Всё это сделано для того, чтобы протестировать как будет выглядеть данный блок, если описание новости будет длинной.
			`,
        published_at: new Date(Date.now() - i * 86400000).toISOString(), // разная дата
        previewInfo: {
          url: "/img/newsPlaceholder.png",
        },
        gallery: [],
      }));

      this.currentNews = fakeNews.find((item) => item.id === newsId) || null;
    },

    async login(email, password) {
      let adminData = await this.api.login({ email, password });
      this.admin = adminData.data;
    },
    async getAuthAdmin() {
      let adminData = await this.api.getAuthAdmin();
      this.admin = adminData.data;
    },
    async logout() {
      await this.api.logout();
      this.admin = null;
    },
  },
});
