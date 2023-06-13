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
        selectedYear: 2022,
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
    availableYears(){
      const uniqueTable = {};
      let years = this.interaction.images.map(i => i.year).filter((year) =>(!uniqueTable[year] && (uniqueTable[year] = 1)));
      return years.sort();
    },
    yearImages(){
      return this.interaction.images.filter(i => i.year == this.selectedYear);
    },
    preparedImages(){
      return this.yearImages.map(i=>{
        let url = null;
        try{
                url = new URL(i.image);
            }catch{
                url = new URL('storage/' + i.image, import.meta.env.VITE_VUE_APP_API_URL);
            }
        i.src = url;
        return i;
      })
    }
  },
  watch:{

  },
  async beforeRouteEnter(to, from, next){
    let interaction = useGameStore();
    if(!interaction.images){
        await interaction.loadImages();
    }
    next();
  }
};
</script>


<template>
  <div class="wrapper">
    <teleport to="body">
      <popup_slider v-if="interaction.popupSlider" :images="preparedImages"/>
    </teleport>  
    <div class="bg-element img-animate-gsap">
      <img src="/img/background_page/photo_gallery.svg" alt=""/>
    </div>
    <header_comp/>
    <div class="wrapper-block">
      <div class="years-container">
        <button class="year"
        v-for="year in availableYears"
        :key="year"

        @click="selectedYear = year"
        :class="{active: selectedYear == year}">
          {{year}}
        </button>
      </div>
      <div class="content-block">
        <div class="item-img" 
          v-for="img in preparedImages"
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
  overflow: hidden;
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



@media (max-width: 1440px) {
  .wrapper-block{
    width: 70vw;
  }
  .item-img{
    width: 22.0vw;
    height: 17vw;
    margin: 0 1vw 1vw 0;
  }
}
@media (max-width: 1024px) {
  .wrapper-block{
    width: 80vw;
  }
  .item-img{
    width: 38vw;
    height: 29vw;
    margin: 0 1vw 1vw 0;
  }
  .content-block{
    max-height: 580px;
  }
}
@media (max-width: 980px) {

}
@media (max-width: 768px) {

}
@media (max-width: 640px) {

}
@media (max-width: 480px) {
  .years-container{
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .year{
    width: calc(50% - 2vw);
  }
  .year:nth-child(1){
    margin: 0 2vw 10px 0;
  }
  .year:nth-child(2){
    margin: 0 0 10px 2vw;
  }
  .year:nth-child(3){
    margin: 0 2vw 10px 0;
  }
  .year:nth-child(4){
    margin: 0 0 10px 2vw;
  }
  .item-img{
    width: 80vw;
    height: auto;
    margin: 0 0 10px 0;
  }
  .content-block{
    max-height: none;
  }
}
@media (max-width: 420px) {

}
@media (max-width: 380px) {

}


</style>