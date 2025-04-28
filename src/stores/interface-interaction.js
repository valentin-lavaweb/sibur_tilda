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
        "Супергерои СИБУРа! Ежегодно награду получают 3 лучших сотрудника, которые сделали уникальный вклад в развитие компании и отрасли, продемонстрировали достижения, выходящие за рамки занимаемой должности.",
      individual_desc_grade_2:
        "Значительный личный вклад в развитие СИБУРа и результаты «выше ожиданий» – отличительные особенности лауреатов корпоративной награды 2 степени.",
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
      console.log(this.personalSections);
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

    async loadAllNews() {
      this.news = [];
      const perPage = this.newsMeta.perPage || 5;
      const lastPage = this.newsMeta.lastPage || 1;

      for (let page = 1; page <= lastPage; page++) {
        const res = await this.api.getNews(page);
        if (Array.isArray(res.data.data)) {
          this.news.push(...res.data.data);
        }
      }
    },
    async loadNews(page = 1) {
      try {
        this.news = null; // очищаем старое
        const res = await this.api.getNews(page);
        const realNews = res.data.data;
        const meta = res.data.meta;
        console.log(realNews);

        if (Array.isArray(realNews) && realNews.length > 0) {
          this.news = realNews.sort(
            (a, b) => new Date(b.published_at) - new Date(a.published_at)
          );
          this.newsMeta = meta;
          return;
        }
      } catch (error) {
        console.error("Ошибка загрузки реальных новостей", error);
      }

      // --- ЕСЛИ НЕ ПОЛУЧИЛОСЬ ЗАГРУЗИТЬ ---

      // Параметры фейковых новостей
      const totalItems = 15;
      const perPage = 5;
      const lastPage = Math.ceil(totalItems / perPage);

      // Генерация всех фейковых новостей
      const fakeNews = Array.from({ length: totalItems }, (_, i) => ({
        id: i + 1,
        title: `Новость ${i + 1}`,
        content: `Содержимое новости ${i + 1}`,
        published_at: new Date(Date.now() - i * 86400000).toISOString(),
        previewInfo: {
          url: `/img/newsPlaceholder${(i + 1) % 2}.png`,
        },
        gallery: [],
      }));

      // Оставляем только нужную страницу
      const start = (page - 1) * perPage;
      const end = start + perPage;
      const paginatedNews = fakeNews.slice(start, end);

      this.news = paginatedNews;
      this.newsMeta = {
        perPage: perPage,
        currentPage: page,
        lastPage: lastPage,
        total: totalItems,
        from: start + 1,
        to: Math.min(end, totalItems),
      };
    },

    /** загрузить одну новость */
    async loadNewsById(id) {
      const newsId = parseInt(id);

      // Если новостей нет или их меньше чем общее количество — подгружаем все страницы
      if (!this.news || this.news.length < this.newsMeta.total) {
        await this.loadAllNews();
      }

      // Пытаемся найти новость среди загруженных
      this.currentNews = this.news.find((item) => item.id === newsId) || null;

      // Если всё равно не нашли — пробуем среди фейковых (если надо)
      if (!this.currentNews) {
        const totalItems = 15;
        const fakeNews = Array.from({ length: totalItems }, (_, i) => ({
          id: i + 1,
          title: `Новость ${i + 1}`,
          content: `
					<p>Это подробное описание новости с ID №${
            i + 1
          }. Здесь можно писать текст для проверки отображения длинного описания.</p>
				`,
          published_at: new Date(Date.now() - i * 86400000).toISOString(),
          previewInfo: {
            url: `/img/newsPlaceholder${(i + 1) % 2}.png`,
          },
          gallery: [],
        }));

        this.currentNews = fakeNews.find((item) => item.id === newsId) || null;
      }
    },

    async login(email, password) {
      let adminData = await this.api.login({ email, password });
      if (adminData.data.token) {
        document.cookie = "sibur.token=" + adminData.data.token;
      }
      this.admin = adminData.data;
    },
    async getAuthAdmin() {
      let adminData = await this.api.getAuthAdmin();
      if (adminData.data.token) {
        document.cookie = "sibur.token=" + adminData.data.token;
      }
      this.admin = adminData.data;
    },
    async logout() {
      await this.api.logout();
      this.admin = null;
    },
  },
});
