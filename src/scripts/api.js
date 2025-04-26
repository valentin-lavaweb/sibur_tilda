/*
 * This is the initial API interface
 * we set the base URL for the API
 * src\scripts\api.js
 */

import axios from "axios";

export const authClient = axios.create({
  //   baseURL: import.meta.env.VITE_VUE_APP_BASE_URL,
  baseURL: "https://api.siburaward.com",
  withCredentials: true,
});

const getTokenFromCookies = () => {
  try {
    const token = document.cookie
      .split('; ')
      .find(cookie => cookie.startsWith('sibur.token='))
      ?.split('=')[1]

    return token ? decodeURIComponent(token) : null
  } catch (error) {
    console.error('Ошибка при получении токена из куков:', error)
    return null
  }
}

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_VUE_APP_API_URL + "/api/",
  withCredentials: true,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
});

apiClient.interceptors.request.use(
  async (config) => {
    // 1) Получаем свежую CSRF-куку
    // await apiClient.get("/sanctum/csrf-cookie");

    console.log(document.cookie);
    const token = getTokenFromCookies()
    console.log('token', token);
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    // 2) Берём XSRF-токен из куки и кладём в заголовок
    const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
    console.log('match', match);
    if (match) {
      config.headers["X-XSRF-TOKEN"] = decodeURIComponent(match[1]);
    }

    return config;
  },
  (error) => Promise.reject(error)
);
/**
   * @typedef {Object} PersonalAwardPayload
   * @property {string} name 
   * @property {string} position
  //  * @property {string} division
   * @property {string} company 
   * @property {string} award   
   * @property {number} grade   
   * @property {string} issued  
   * @property {File} image   
   * @property {number} year    
   * @property {number} personal-award-section_id 
   */

/**
 * @typedef {Object} CommandAwardPayload
 * @property {string} nomination
 * @property {string} description
 * @property {string} project
 * @property {string} authors
 * @property {File} image
 * @property {number} year
 */

/**
 * @typedef {Object} PersonalAwardSectionPayload
 * @property {string} title
 * @property {boolean} issuer_filter
 * @property {boolean} company_filter
 * @property {boolean} grade_filter
 */

/**
 * @typedef {Object} ImagePayload
 * @property {File} image
 * @property {File} preview
 * @property {number} removePreview
 * @property {number} year
 */

/**
 * @typedef {Object} PersonalAwardFilter
 * @property {?string} name
 * @property {?string} companies
 * @property {?string} issuers
 * @property {?numeric} grade
 * @property {?numeric} year
 * @property {?numeric} personal-award-section_id
 */

export default {
  /**
   * Description
   * @param {PersonalAwardFilter} filter
   * @param {?number} page
   * @returns {any}
   */
  getPersonalAwards(filter, page = 0) {
    for (let prop in filter) {
      if (filter[prop] === undefined) {
        delete filter[prop];
      }
    }

    let searchParams = new URLSearchParams(filter);

    searchParams.append("page", page);

    // return apiClient.get("/v2/personal-awards?" + searchParams);
    return apiClient.get("/personal_awards?" + searchParams);
  },

  getPersonalAwardSections() {
    return apiClient.get("/v2/personal-award-sections");
  },
  getCommandAwards() {
    return apiClient.get("/v2/command-awards");
  },
  getGallery() {
    return apiClient.get("/gallery");
  },

  getDictionary() {
    return apiClient.get("/dictionary");
  },

  /**
   * Description
   * @param {PersonalAwardPayload} data
   * @returns {Promise}
   */
  createPersonalAward(data) {
    let payload = new FormData();
    for (let prop in data) {
      payload.append(prop, data[prop]);
    }
    return apiClient.post("/v2/personal-award", payload);
  },
  /**
   * Description
   * @param {number} id
   * @param {PersonalAwardPayload} data
   * @returns {Promise}
   */
  updatePersonalAward(id, data) {
    let payload = new FormData();
    payload.append("_method", "PUT");
    for (let prop in data) {
      payload.append(prop, data[prop]);
    }
    return apiClient.post("/v2/personal-award/" + id, payload);
  },

  /**
   * Description
   * @param {number} id
   * @returns {Promise}
   */
  deletePersonalAward(id) {
    return apiClient.delete("/v2/personal-award/" + id);
  },

  /**
   * Description
   * @param {CommandAwardPayload} data
   * @returns {Promise}
   */
  createCommandAward(data) {
    let payload = new FormData();
    for (let prop in data) {
      payload.append(prop, data[prop]);
    }
    return apiClient.post("/v2/command-awards", payload);
  },
  /**
   * Description
   * @param {number} id
   * @param {CommandAwardPayload} data
   * @returns {Promise}
   */
  updateCommandAward(id, data) {
    let payload = new FormData();
    payload.append("_method", "PUT");
    for (let prop in data) {
      payload.append(prop, data[prop]);
    }
    return apiClient.post("/v2/command-awards/" + id, payload);
  },

  /**
   * Description
   * @param {number} id
   * @returns {Promise}
   */
  deleteCommandAward(id) {
    return apiClient.delete("/v2/command-awards/" + id);
  },

  /**
   * Description
   * @param {PersonalAwardSectionPayload} data
   * @returns {Promise}
   */
  createPersonalAwardSection(data) {
    let payload = new FormData();
    for (let prop in data) {
      payload.append(prop, data[prop]);
    }
    return apiClient.post("/v2/personal-award-section", payload);
  },
  /**
   * Description
   * @param {number} id
   * @param {PersonalAwardSectionPayload} data
   * @returns {Promise}
   */
  updatePersonalAwardSection(id, data) {
    let payload = new FormData();
    payload.append("_method", "PUT");
    for (let prop in data) {
      payload.append(prop, data[prop]);
    }
    return apiClient.post("/v2/personal-award-section/" + id, payload);
  },

  /**
   * Description
   * @param {number} id
   * @returns {Promise}
   */
  deletePersonalAwardSection(id) {
    return apiClient.delete("/v2/personal-award-section/" + id);
  },

  /**
   * Description
   * @param {ImagePayload} data
   * @returns {Promise}
   */
  createImage(data) {
    const payload = new FormData();
    for (const prop in data) {
      payload.append(prop, data[prop]);
    }
    return apiClient.post("/image", payload);
  },
  /**
   * Description
   * @param {number} id
   * @param {ImagePayload} data
   * @returns {Promise}
   */
  updateImage(id, data) {
    const payload = new FormData();
    payload.append("_method", "PUT");
    for (const prop in data) {
      payload.append(prop, data[prop]);
    }
    return apiClient.post(`/image/${id}`, payload);
  },

  /**
   * Description
   * @param {number} id
   * @returns {Promise}
   */
  deleteImage(id) {
    // удаление по /api/image/:id
    return apiClient.delete(`/image/${id}`);
  },

  /**
   * Description
   * @param {string} key
   * @param {string} text
   * @returns {Promise}
   */
  updateText(key, text) {
    let payload = new FormData();
    payload.append("_method", "PUT");
    payload.append("text", text);
    return apiClient.post("/dictionary/" + key, payload);
  },

  /**
   * Получить список новостей с пагинацией
   * @param {number} page
   */
  getNews(page = 1) {
    return apiClient.get(`/v2/news?page=${page}`);
  },

  /**
   * Получить одну новость по id
   * @param {number|string} id
   */
  getNewsById(id) {
    return apiClient.get(`/v2/news/${id}`);
  },

  /**
   * Создать новость
   * @param {Object} data
   */
  createNews(data) {
    const payload = new FormData();
    for (let prop in data) payload.append(prop, data[prop]);
    return apiClient.post("/v2/news", payload);
  },

  /**
   * Обновить новость
   * @param {number|string} id
   * @param {Object} data
   */
  updateNews(id, data) {
    const payload = new FormData();
    payload.append("_method", "PUT");
    for (let prop in data) payload.append(prop, data[prop]);
    return apiClient.post(`/v2/news/${id}`, payload);
  },

  /**
   * Удалить новость
   * @param {number|string} id
   */
  deleteNews(id) {
    return apiClient.delete(`/v2/news/${id}`);
  },

  // Авторизация
  async login({ email, password }) {
    // 1) получаем CSRF-cookie с основного домена
    await authClient.get("/sanctum/csrf-cookie");
    // 2) логинимся там же, на /login
    return apiClient.post("/v2/login", { email, password });
  },
  logout() {
    return apiClient.post("/logout");
  },
  async getAuthAdmin() {
    await authClient.get("/sanctum/csrf-cookie");
    return apiClient.get("/admin/auth");
  },
};
