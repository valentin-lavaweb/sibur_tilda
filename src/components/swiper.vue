<template>
    <swiper class="mySwiper">
      <swiper-slide>
        <img :src="image" :alt="image">
      </swiper-slide>
    </swiper>
  </template>
  <script>
    // Import Swiper Vue.js components
    import { Swiper, SwiperSlide } from 'swiper/vue';
  
  
    export default {
        props:{
            image: String,
        },
      components: {
        Swiper,
        SwiperSlide,
      },
      setup() {
        return {};
      },
    };
  </script>
  <style>
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>