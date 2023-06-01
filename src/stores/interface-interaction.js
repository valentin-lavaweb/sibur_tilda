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
    popupSlider: false,
    enableSlide: 1,
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
