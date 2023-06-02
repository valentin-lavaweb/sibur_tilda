<script>
import { useGameStore } from '@/stores/interface-interaction.js';
import header_comp from "@/components/header.vue";
import footer_comp from "@/components/footer.vue";

import popup_slider from "@/components/popup/popup_slider.vue";

import gsap from "gsap";

export default {
  name: "photo_gallery",
  data() {
    let interaction = useGameStore();
    return{
        yearPhoto: '2023',
        interaction: interaction,
    }
  },
  components:{
    header_comp,
    footer_comp,
    popup_slider,
  },
  methods: {

  },
  mounted() {
    gsap.from(".img-animate-gsap", {
    x: -20,
    opacity: 0,
    duration: 0.5,
    delay: 0.25,
    ease: "back",
    });
  },
  computed:{
    
  },
  watch:{

  },
};
</script>


<template>
  <div class="wrapper">
    <teleport to="body">
      <popup_slider v-if="interaction.popupSlider"/>
    </teleport>  
    <div class="bg-element img-animate-gsap">
      <img src="/img/background_page/photo_gallery.svg" alt=""/>
    </div>
    <header_comp/>
    <div class="wrapper-block">
      <div class="years-container">
        <button class="year" 
        @click="yearPhoto = '2020'"
        :class="{active: yearPhoto == '2020'}">
          2020
        </button>
        <button class="year" 
        @click="yearPhoto = '2021'"
        :class="{active: yearPhoto == '2021'}">
          2021
        </button>
        <button class="year" 
        @click="yearPhoto = '2022'"
        :class="{active: yearPhoto == '2022'}">
          2022
        </button>
        <button class="year" 
        @click="yearPhoto = '2023'"
        :class="{active: yearPhoto == '2023'}">
          2023
        </button>
      </div>
      <div class="content-block">
        <div class="item-img" 
          v-for="img in interaction.imges"
          :key="img.id"
          @click="interaction.openSlide(img.id)"
          >
          <img :src="img.src" alt="img"/>
        </div>
      </div>
    </div>
    <footer_comp/>
  </div>
</template>

<style scoped>

.wrapper{
  width: 100%;
  height: 100%;
}
.wrapper-block{
   width: 1160px;
   height: fit-content;
   margin: 130px 0 0 0;
}

.years-container{
  margin: 33px 0 0 0;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  z-index: 2;
}
.year:first-child{
  margin: 0;
}
.year.active{
  background-color: var(--nipigasColorAdditional);
  color: var(--white);
}
.year{
  margin: 0 0 0 50px;
  width: 100px;
  height: 30px;
  border-radius: 5px;
  border: none;
  background-color: rgba(246, 246, 246, 1);
  color: var(--nipigasColorMain);
  font-size: 16px;
  font-weight: 500;
  transition: all 0.25s ease;
  cursor: pointer;
}
.year:hover{
  background-color: var(--nipigasColorAdditional);
  color: var(--white);
}




.content-block{
  margin: 28px 0 50px 0;
  width: 100%;
  min-height: fit-content;
  max-height: 720px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 2;
}
.item-img{
  width: 364px;
  height: 260px;
  margin: 0 20px 20px 0;
  transition: all 0.25s ease;
  cursor: pointer;
}
.item-img:hover{
  filter: brightness(0.5);
}






.bg-element{
  position: absolute;
  top: 0;
  left: 0;
  width: 1400px;
  height: 100%;
}
</style>