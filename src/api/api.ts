import { siburaward } from './swagger/siburaward';

// Базовый URL API
const API_BASE_URL = 'https://api.siburaward.com';

// Создаем экземпляр API-клиента
const apiClient = new siburaward({
  baseUrl: API_BASE_URL,
  baseApiParams: {
    headers: {
      'Accept': 'application/json',
    },
  },
});

// Функция для установки куки
function setCookie(name: string, value: string, days: number = 30) {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

// Функция для получения куки
function getCookie(name: string): string | null {
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

// Функция для удаления куки
function eraseCookie(name: string) {
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

// Функция для установки токена авторизации
export const setAuthToken = (token: string | null) => {
  if (token) {
    apiClient.setSecurityData(token);
    setCookie('sibur.token', token);
  } else {
    apiClient.setSecurityData(null);
    eraseCookie('sibur.token');
  }
};

// Инициализация токена из куки при запуске
export const initAuth = () => {
  const token = getCookie('sibur.token');
  if (token) {
    setAuthToken(token);
  }
};

// API для работы с авторизацией
export const authApi = {
  login: (email: string, password: string) => 
    apiClient.login.login({ email, password }),
  getUser: () => apiClient.user.getUser(),
  logout: () => {
    setAuthToken(null);
  }
};

// API для работы с командными наградами
export const commandAwardsApi = {
  getAll: () => apiClient.commandAwards.getAllCommandAwards(),
  create: (data: any) => apiClient.commandAwards.createCommandAward(data),
  update: (id: number, data: any) => apiClient.commandAwards.updateCommandAward(id, data),
  delete: (id: number) => apiClient.commandAwards.deleteCommandAward(id),
};

// API для работы с личными наградами
export const personalAwardsApi = {
  getAll: (params?: any) => apiClient.personalAwards.getPersonalAwards(params),
  create: (data: any) => apiClient.personalAwards.createPersonalAward(data),
  update: (id: number, data: any) => apiClient.personalAwards.updatePersonalAward(id, data),
  delete: (id: number) => apiClient.personalAwards.deletePersonalAward(id),
};

// API для работы с разделами личных наград
export const personalAwardSectionsApi = {
  getAll: () => apiClient.personalAwardSections.getAllPersonalAwardSections(),
  create: (data: any) => apiClient.personalAwardSections.createPersonalAwardSection(data),
  update: (id: number, data: any) => apiClient.personalAwardSections.updatePersonalAwardSection(id, data),
  delete: (id: number) => apiClient.personalAwardSections.deletePersonalAwardSection(id),
};

// API для работы с новостями
export const newsApi = {
  getAll: () => apiClient.news.getNews(),
  create: (data: any) => apiClient.news.createNews(data),
  update: (id: number, data: any) => apiClient.news.updateNews(id, data),
  delete: (id: number) => apiClient.news.deleteNews(id),
};

// API для работы с таймлайном
export const timelineApi = {
  getAll: () => apiClient.timelineItems.getAllTimelineItems(),
  create: (data: any) => apiClient.timelineItems.createTimelineItem(data),
  update: (id: number, data: any) => apiClient.timelineItems.updateTimelineItem(id, data),
  delete: (id: number) => apiClient.timelineItems.deleteTimelineItem(id),
};

// API для работы с изображениями
export const imagesApi = {
  getAll: () => apiClient.images.getAllImages(),
  create: (data: any) => apiClient.images.createImage(data),
  update: (id: number, data: any) => apiClient.images.updateImage(id, data),
  delete: (id: number) => apiClient.images.deleteImage(id),
};

// API для работы с файлами
export const filesApi = {
  upload: (files: File[]) => {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files[]', file);
    });
    return apiClient.files.uploadFiles(formData as any);
  },
  uploadChunked: (data: any) => apiClient.files.uploadChunkedFile(data),
};

// API для работы с текстами
export const textsApi = {
  getAll: () => apiClient.texts.getAllTexts(),
  update: (key: string, text: string) => apiClient.texts.setText(key, { text }),
};

// Экспортируем общий API-клиент для продвинутых кейсов
export const api = apiClient;

export default {
  auth: authApi,
  commandAwards: commandAwardsApi,
  personalAwards: personalAwardsApi,
  personalAwardSections: personalAwardSectionsApi,
  news: newsApi,
  timeline: timelineApi,
  images: imagesApi,
  files: filesApi,
  texts: textsApi,
};
