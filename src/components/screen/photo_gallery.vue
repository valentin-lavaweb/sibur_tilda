<script>
import { useGameStore } from '@/stores/interface-interaction.js';
import header_comp from "@/components/header.vue";
import footer_comp from "@/components/footer.vue";

import popup_slider from "@/components/popup/popup_slider.vue";

export default {
  name: "photo_gallery",
  data() {
    let interaction = useGameStore();
    return{
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
    <header_comp/>
    <div class="wrapper-block">
      <div class="years-container">
        <button class="year">
          2020
        </button>
        <button class="year">
          2021
        </button>
        <button class="year">
          2022
        </button>
        <button class="year active">
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
  width: 360px;
  height: 260px;
  margin: 0 20px 20px 0;
  transition: all 0.25s ease;
  cursor: pointer;
}
.item-img:hover{
  filter: brightness(0.5);
}
</style>