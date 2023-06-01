import { defineStore } from "pinia";

export const useGameStore = defineStore("interface", {
  state: () => ({
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
    nominationArray:[
      {
        id: 1,
        title: `Номинация «Производственное решение года»`,
        subTitle: `Система видеоинспекции для проверки качества гидроструйной чистки петлевых реакторов ПЭВП ЗСНХ`,
        autors: `Михаил Бурый, Юрий Дерюгин, Иван Тарасов, Георгий Клевцов.`,
      },
      {
        id: 2,
        title: `Номинация «Лучшее организационное решение»`,
        subTitle: `Проект «Оптимизатор»`,
        autors: `Рустам Гилязов, Алена Безрукова, Евгений Поляков.`,
      },
      {
        id: 3,
        title: `Номинация «Решение в области работы с клиентами»`,
        subTitle: `Коллаборация СИБУР и WOS: капсульная коллекция одежды из переработанного пластика`,
        autors: `Константин Вернигоров, Анастасия Щербинина, Константин Лукошко, Иванна Гребенюк.`,
      },
      {
        id: 4,
        title: `Номинация «Приз зрительских симпатий»`,
        subTitle: `Замещение импортных и отечественных марок полиолефинов на специальные марки СИБУР`,
        autors: `Авторы: Александр Мазильников, Камиля Мамлеева, Валерий Панарин, Иван Турчан, Ильдар Салахов.`,
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

  },
  actions: {
    openSlide(id){
      this.popupSlider = true;
      this.enableSlide = id;
    },
  },
});
