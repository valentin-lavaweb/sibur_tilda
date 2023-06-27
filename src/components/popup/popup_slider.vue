<script>
import { useGameStore } from '@/stores/interface-interaction.js';
import swiper from "@/components/swiper.vue";

export default {
  name: "popup_slider",
  props:{
    images: Array
  },
  data() {
    let interaction = useGameStore();
    return{
        sliderIndex: (9995 + interaction.enableSlide),
        interaction: interaction,
    }
  },
  components:{
    swiper,
  },
  methods:{
    backSlide(){
      this.sliderIndex--;
    },
    nextSlide(){
      this.sliderIndex++;
    },
    closeSlider(){
      this.interaction.popupSlider = false;
    }
  },
  mounted() {

  },
  computed:{
    selectedSlide:{
      get(){
          return this.images[this.sliderIndex % this.images.length];
      },
      set(value){
          let imgIndex = this.images.indexOf(value);
          let resultIndex = imgIndex + 1000*this.images.length;
          this.sliderIndex = resultIndex;
      }
    },
  },
  watch:{

  },
};
</script>


<template>
  <div class="popup_slider" @click.self="closeSlider">
    <div class="slider-container">
        <div class="slider-close" @click="closeSlider">
          <img src="/img/close_swiper.svg" alt="close"/>
        </div>
        <div class="slider-arrow left" @click="backSlide()">
            <img src="/img/arrow.svg" alt="arrow"/>
        </div>
        <!-- <div class="slider">
            <img :src="selectedSlide.originalSrc" alt="img"/>
        </div> -->
        <div class="slider">
          <swiper :image="selectedSlide.originalSrc"/>
        </div>
        <div class="slider-arrow" @click="nextSlide()">
            <img src="/img/arrow.svg" alt="arrow"/>
        </div>
    </div>
  </div>
</template>

<style scoped>
.popup_slider{
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(9, 89, 95, 0.84);
    z-index: 6;
    transition: all 0.25s ease;
}

.slider-container{
    width: 1280px;
    height: 580px;
    flex-direction: row;
    justify-content: space-between;
    transition: all 0.25s ease;
}


.slider-close{
    position: absolute;
    top: -36px;
    right: calc(1280px - 1130px - 80px + 5px);
    color: rgba(255, 255, 255, 1);
    font-size: 16px;
    font-weight: 500;
    z-index: 3;
    transition: all 0.25s ease;
    cursor: pointer;
}
.slider-close:hover{
    color: rgb(204, 204, 204);
}

.slider{
    width: 1130px;
    height: 580px;
    overflow: hidden;
}
.slider img{
    object-fit: cover;
}
.slider-arrow.left{
    transform: rotate(180deg);
}
.slider-arrow{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--nipigasColorAdditional);
    transition: all 0.25s ease;
    cursor: pointer;
}
.slider-arrow img{
    width: 12px;
    transition: all 0.25s ease;
}

@media (max-width: 1440px) {
  .slider-container{
    width: 90vw;
  }
  .slider{
    width: calc(100% - 80px - 70px);
    height: 80vh;
  }
  .slider-close{
    top: 0vw;
    transform: translateY(-220%);
  }
}
@media (max-width: 1024px) {
  .slider img{
    width: 100%;
    height: 100%;
  }
}
@media (max-width: 768px) {
  .slider{
    height: 50vw;
  }
  .slider-container{
    height: 50vw;
  }
  .slider-close{
    top: 0vw;
    transform: translateY(-120%);
  }
}
@media (max-width: 480px) {
  .slider{
    width: calc(100% - 60px - 20px);
  }
  .slider-arrow{
    width: 30px;
    height: 30px;
  }
  .slider-close{
    right: calc(100% - 80vw);
  }
}
</style>