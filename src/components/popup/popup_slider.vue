<script>
import { useGameStore } from '@/stores/interface-interaction.js';
// import swiper from "@/components/swiper.vue";
import { Swiper, SwiperSlide } from 'swiper/vue';
import { markRaw } from 'vue';

export default {
  name: "popup_slider",
  props: {
    images: Array
  },
  data() {
    let interaction = useGameStore();
    return {
      interaction: interaction,
      swiperInstance: null,
    }
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  methods: {
    backSlide() {
      // this.sliderIndex--;
      this.swiperInstance?.slidePrev();
    },
    nextSlide() {
      // this.sliderIndex++;
      this.swiperInstance?.slideNext();
    },
    closeSlider() {
      this.interaction.popupSlider = false;
    },
    initSwiper(swiper) {

      this.swiperInstance = markRaw(swiper);

      console.info(this.swiperInstance);

      let sliderIdx = this.images.findIndex(i => i.id == this.interaction.enableSlide?.id);


      console.info("sliderIdx");
      console.info(sliderIdx);

      this.swiperInstance.activeIndex = sliderIdx;
      this.swiperInstance.update();
    }
  },
  mounted() {

  },
  computed: {
    // selectedSlide:{
    //   get(){
    //       return this.images[this.sliderIndex % this.images.length];
    //   },
    //   set(value){
    //       let imgIndex = this.images.indexOf(value);
    //       let resultIndex = imgIndex + 1000*this.images.length;
    //       this.sliderIndex = resultIndex;
    //   }
    // },
  },
  watch: {

  },
};
</script>


<template>
  <div class="popup_slider" @click.self="closeSlider">
    <div class="slider-container">
      
      <div class="slider-arrow left" @click="backSlide()">
        <img src="/img/arrow.svg" alt="arrow" />
      </div>
      <!-- <div class="slider">
            <img :src="selectedSlide.originalSrc" alt="img"/>
        </div> -->
      <div class="slider">
        <!-- <swiper :image="selectedSlide.originalSrc"/> -->
        <swiper class="mySwiper" @swiper="initSwiper">
          <swiper-slide v-for="image of images" :key="image.id">
            <img :src="image.originalSrc" loading="lazy">
          </swiper-slide>
        </swiper>
      </div>
      <div class="slider-close" @click="closeSlider">
        <img src="/img/close_swiper.svg" alt="close" />
      </div>
      <div class="slider-arrow" @click="nextSlide()">
        <img src="/img/arrow.svg" alt="arrow" />
      </div>
    </div>
  </div>
</template>
<style>
.swiper {
  width: 100%;
  height: 100%;
  flex-direction: row;
  justify-content: flex-start;
}

.swiper-wrapper {
  justify-content: flex-start;
  flex-direction: row;
}

.swiper-slide {
  width: 100%;
  height: 100%;
  text-align: left;
  font-size: 18px;

  /* Center slide text vertically */
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
}
</style>

<style scoped>
.popup_slider {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(9, 89, 95, 0.84);
  z-index: 6;
  transition: all 0.25s ease;
}

.slider-container {
  width: 1280px;
  height: 90vh;
  flex-direction: row;
  justify-content: space-between;
  transition: all 0.25s ease;
}


.slider-close {
  position: absolute;
  top: 5vh;
  right: 5px;
  color: rgba(255, 255, 255, 1);
  font-size: 16px;
  font-weight: 500;
  z-index: 3;
  transition: all 0.25s ease;
  cursor: pointer;
}

.slider-close:hover {
  color: rgb(204, 204, 204);
}

.slider {
  width: 1130px;
  max-height: 90vh;
  overflow: hidden;
}

.slider img {
  object-fit: scale-down;
}

.slider-arrow.left {
  transform: rotate(180deg);
}

.slider-arrow {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--nipigasColorAdditional);
  transition: all 0.25s ease;
  cursor: pointer;
}

.slider-arrow img {
  width: 12px;
  transition: all 0.25s ease;
}

@media (max-width: 1440px) {
  .slider-container {
    width: 90vw;
  }

  .slider {
    width: calc(100% - 80px - 70px);
    height: 80vh;
  }

}

@media (max-width: 1024px) {
  .slider img {
    width: 100%;
    height: 100%;
  }
}

@media (max-width: 768px) {
  .slider {
    height: 50vw;
  }

}

@media (max-width: 480px) {
  .slider {
    width: calc(100% - 60px - 20px);
  }

  .slider-arrow {
    width: 30px;
    height: 30px;
  }

  .slider-close {
    right: calc(100% - 80vw);
  }
}
</style>