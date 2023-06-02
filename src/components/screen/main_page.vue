<script>
import { useGameStore } from '@/stores/interface-interaction.js';
import header_comp from "@/components/header.vue";
import footer_comp from "@/components/footer.vue";

import gsap from "gsap";

export default {
  name: "main_page",
  data() {
    let interaction = useGameStore();
    return{
        interaction: interaction,
    }
  },
  components:{
    header_comp,
    footer_comp,
  },
  methods: {

  },
  mounted() {
    gsap.from(".img-animate-gsap", { 
    x: 240,
    opacity: 0, 
    duration: 0.5,
    ease: "sine",
   });
   gsap.from(".text-animate-gsap", {
    x: -100,
    opacity: 0,
    duration: 0.25,
    stagger: 0.15,
    delay: 0.25,
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
    <header_comp/>
    <div class="wrapper-block">
      <div class="content-block">
        <h2 class="subTitle text-animate-gsap">
          НАГРАДНАЯ КАМПАНИЯ
        </h2>
        <h1 class="title text-animate-gsap">
          ЭНЕРГИЯ <br> 
          ПРИЗНАНИЯ
        </h1>
        <span class="text text-animate-gsap">  
          — это возможность поощрить лучших профессионалов компании <br>
          и вдохновить остальных! СИБУР ежегодно подчеркивает вклад <br>
          сотрудников в развитие холдинга: как благодарственными грамотами, <br>
          так и материальным вознаграждением.
        </span>
        <span class="pinata text-animate-gsap">
          Сделаем успех видимым для каждого!
        </span>
      </div>
      <div class="img-block img-animate-gsap">
        <img src="/img/the_energy_of_recognition.svg" alt="the_energy_of_recognition"/>

        <img src="/img/wreath.svg" class="wreath left" alt="wreath"/>
        <img src="/img/wreath_right.svg" class="wreath right" alt="wreath"/>
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
   margin: 130px 0 300px 0;
}


.content-block{
  margin: 250px 0 0 0;
  width: 100%;
  justify-content: flex-start;
  align-items: flex-start;
  z-index: 2;
}
.subTitle{
  font-size: 36px;
  color: var(--nipigasColorMain);
}
.title{
  font-size: 96px;
  font-weight: 700;
  color: var(--nipigasColorAdditional);
  line-height: 100%;
}
.text{
  font-size: 16px;
  color: var(--textColorBlack);
  margin: 14px 0;
}
.pinata{
  font-size: 16px;
  font-weight: 700;
  color: var(--nipigasColorAdditional);
}


.img-block{
  position: absolute;
  top: 0;
  right: 0;
  margin: 50px 0 0 0;
  transform: translateX(120px);
  z-index: 1;
}
.wreath{
  position: absolute;
  bottom: 150px;
  left: 29%;
  width: 180px;
  animation: wreathMove 3s ease infinite;
}
.wreath.right{
  left: unset;
  right: 22%;
  animation: wreathMove2 3s ease infinite;
}

@keyframes wreathMove {
  0% {
    transform: translateX(0px)translateY(0px)rotate(0deg);
    animation-timing-function: ease-out;
  }
  50% {
      transform: translateX(-30px)translateY(-10px)rotate(-10deg);
      animation-timing-function: ease-in;
  }
  100% {
      transform: translateX(1px)translateY(0px)rotate(0deg);
  }
}
@keyframes wreathMove2 {
  0% {
    transform: translateX(0px)translateY(0px)rotate(0deg);
    animation-timing-function: ease-out;
  }
  50% {
      transform: translateX(30px)translateY(-10px)rotate(10deg);
      animation-timing-function: ease-in;
  }
  100% {
      transform: translateX(1px)translateY(0px)rotate(0deg);
  }
}
</style>